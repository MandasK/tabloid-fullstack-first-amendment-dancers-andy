import React, { useContext, useEffect } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import Comment from "./Comment";



const CommentList = () => {
    const { comments, getAllComments } = useContext(CommentContext);

    useEffect(() => {
        getAllComments();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    {comments.map((comment) => (
                        <Comment key={comment.id} comment={comment} />

                    ))}
                </div>
            </div>
        </div>
    )


};

export default CommentList;