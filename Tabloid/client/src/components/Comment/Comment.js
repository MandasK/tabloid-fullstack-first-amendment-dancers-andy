import { Button, Card, CardBody } from "reactstrap";
import { CommentContext } from "../../providers/CommentProvider";
import React, { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom"


const Comment = ({ comment }) => {
    const { deleteComment } = useContext(CommentContext)
    const history = useHistory();
    const submit = () => {

        deleteComment(comment.id).then(() => {
            history.push("/");
        })

    }
    return (
        <Card>
            <CardBody>
                <div>{comment.subject}</div>
                <div>{comment.userProfileId}</div>
                <div>
                    <Link to={`/comment/${comment.id}/delete`}>
                        <Button>Delete</Button>
                    </Link>
                </div>

                <div>
                    <Link to={`/comment/${comment.id}/edit`}>
                        <Button>Edit</Button>
                    </Link>
                </div>
            </CardBody>
        </Card>
    )
};

export default Comment;