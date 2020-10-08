import React, { useContext, useEffect, useState, useRef } from "react";
import { PostContext } from "../providers/PostProvider";
import PostCard from "./PostCard";

const PostList = () => {
    const { posts, getAllPosts } = useContext(PostContext);


    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    {posts.map((post) => (

                        <>
                            <p>Title: {post.title}</p>
                            <p>Author: {post.userProfile.firstName} {post.userProfile.lastName}</p>
                            <p>Category: {post.category.name}</p>

                        </>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostList;