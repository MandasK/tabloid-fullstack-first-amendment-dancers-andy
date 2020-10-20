import React, { useContext, useEffect } from "react";
import {Helmet} from "react-helmet";
import { CommentContext } from "../../providers/CommentProvider";
import Comment from "./Comment";
import { useParams, useHistory, Link } from 'react-router-dom';



const CommentList = () => {
    const { comments, getCommentsByPostId } = useContext(CommentContext);
    const { postId } = useParams();

    useEffect(() => {
        getCommentsByPostId(postId);
    }, []);

    return (
        <>
        <Helmet>
            <title>Tabloid-List of Comments </title>
            <meta name="description" content="Tabloid comments on a Post" />
        </Helmet>
            <p><Link to={`/posts/${postId}/comments/new`}>New Comment</Link></p>
            <p><Link to={`/posts/${postId}`}>Back to post</Link></p>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards-column">
                        {comments.map((comment) => 
                            <Comment key={comment.id} comment={comment} 
                            />

                        )}
                    </div>
                </div>
            </div>
        </>
    )

};

export default CommentList;