import React, { useContext, useState, useEffect } from "react";
import {useHistory, useParams} from 'react-router-dom';
import { CommentContext } from "../../providers/CommentProvider";
import { Button, Card, CardBody } from "reactstrap";



const CommentDelete = () => {
    const [comment, setComment] = useState();
    const { getCommentById, deleteComment } = useContext(CommentContext);
    const { id, postId, commentId } = useParams();
    const history = useHistory();

    useEffect(() => {
        getCommentById(commentId).then(setComment);
    }, []);

    const handleDelete = (id) => {
        deleteComment(commentId)
            .then(() => history.push(`/post/${postId}/comments`))
    }

    if (!comment) {
        return null;
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-12 col-lg-6">
                    <h3>Are you sure you want to delete {comment.name}?</h3>
                    <Button onClick={handleDelete}>Delete!!!</Button>

                </div>
            </div>
        </div>
    )
}
export default CommentDelete;