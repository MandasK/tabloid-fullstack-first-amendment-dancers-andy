import { Button, Card, CardBody } from "reactstrap";
import {Helmet} from "react-helmet";
import { CommentContext } from "../../providers/CommentProvider";
import React, { useContext, useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom"
import "./Comment.css"


const Comment = ({ comment }) => {
    const { deleteComment } = useContext(CommentContext)
    const history = useHistory();
    const { postId, commentId } = useParams();
    const currentUser = JSON.parse(sessionStorage.getItem('userProfile')).id;
    const submit = () => {

        deleteComment(comment.id).then(() => {
            history.push("/");

        })

    }
    const publishDate = new Date(comment.createDateTime)

    const HumanPublishDate = `${publishDate.getMonth() + 1}/${publishDate.getDate()}/${publishDate.getFullYear()}`


    return (
        <>
        <Helmet>
            <title>Tabloid-Comment {comment.userProfile.firstName}</title>
            <meta name="description" content="Tabloid login page" />
        </Helmet>
        <Card style={{ border: "none" }}>
            <div className="commentCard">
                <CardBody>
                    <div>{comment.userProfile.firstName} {comment.userProfile.lastName}</div>
                    <div>{HumanPublishDate}</div>
                    <strong>{comment.subject}</strong>
                    <div className="commentTextArea">{comment.content}</div>
                    <div>
                        {(currentUser === comment.userProfileId) ?
                            <Link to={`/posts/${postId}/comments/${comment.id}/delete`}>
                                <Button color="danger" className="commentButton">Delete</Button>
                            </Link>
                            : <div></div>}

                        {(currentUser === comment.userProfileId) ?
                            <Link to={`/posts/${postId}/comments/${comment.id}/edit`}>
                                <Button className="commentButton">Edit</Button>
                            </Link>
                            : <div></div>}
                    </div>
                </CardBody>
            </div>
        </Card>
        </>
    )
};

export default Comment;