import { Button, Card, CardBody } from "reactstrap";
import { CommentContext } from "../../providers/CommentProvider";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom"


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
                <div><Button onClick={submit}>Delete</Button></div>
            </CardBody>
        </Card>
    )
};

export default Comment;