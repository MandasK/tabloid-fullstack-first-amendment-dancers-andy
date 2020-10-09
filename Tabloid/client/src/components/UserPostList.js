import React, { useContext, useEffect, useState, useRef } from "react";
import { PostContext } from "../providers/PostProvider";
import PostCard from "./PostCard";
import { useHistory, Link } from "react-router-dom";

const UserPostList = () => {
    const { posts, getAllUserPosts } = useContext(PostContext);
    const history = useHistory();

    console.log("hello!!!")
    console.log(JSON.parse(sessionStorage.getItem("userProfile")).id)

    useEffect(() => {
        getAllUserPosts(JSON.parse(sessionStorage.getItem("userProfile")).id);
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    {posts.map((post) => (
                        <>
                            <Link to={`/posts/${post.id}`}>
                                <strong>{post.title}</strong>
                            </Link>
                            <p>Author: {post.userProfile.firstName} {post.userProfile.lastName}</p>
                            <p>Category: {post.category.name}</p>

                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserPostList;