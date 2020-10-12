import React, { useContext, useEffect, useState, useRef } from "react";
import { PostContext } from "../../providers/PostProvider";
import PostCard from "./PostCard";
import { useHistory, Link } from "react-router-dom";

const PostList = () => {
    const { posts, getAllPosts } = useContext(PostContext);
    const history = useHistory();

    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    <button type="button"
                        onClick={() => { history.push(`/postForm/`) }}>
                        add post
                    </button>
                    {posts.map((post) => (
                        <div key={post.id}>
                            <Link to={`/posts/${post.id}`}>
                                <strong>{post.title}</strong>
                            </Link>
                            <p>Author: {post.userProfile.firstName} {post.userProfile.lastName}</p>
                            <p>Category: {post.category.name}</p>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostList;