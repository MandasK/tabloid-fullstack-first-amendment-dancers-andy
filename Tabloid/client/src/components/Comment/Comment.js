import { Button, Card, CardBody } from "reactstrap";
import { CommentContext } from "../../providers/CommentProvider";
import React, { useContext, useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom"
import "./Comment.css"


const Comment = ({ comment }) => {
    const { deleteComment } = useContext(CommentContext)
    const history = useHistory();
    const { postId, commentId} = useParams();
    const submit = () => {

        deleteComment(comment.id).then(() => {
            history.push("/");
            
        })
        
        }
        const publishDate = new Date(comment.createDateTime)
        console.log(publishDate);
        const HumanPublishDate = `${publishDate.getMonth() + 1}/${publishDate.getDate()}/${publishDate.getFullYear()}`


    return (
        <Card>
            <CardBody>
                <div>{comment.userProfile.firstName} {comment.userProfile.lastName}</div>
                <div>{HumanPublishDate}</div>
                <strong>{comment.subject}</strong>
                <div>{comment.content}</div>
                
                
                <div>
                    <Link to={`/posts/${postId}/comments/${comment.id}/delete`}>
                        <Button color="danger" className="commentButton">Delete</Button>
                    </Link>
                
                    <Link to={`/posts/${postId}/comments/${comment.id}/edit`}>
                        <Button className="commentButton">Edit</Button>
                    </Link>
                </div>
            </CardBody>
        </Card>
    )
};

export default Comment;