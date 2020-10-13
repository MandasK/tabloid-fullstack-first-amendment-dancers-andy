import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([]);
    const { getToken } = useContext(UserProfileContext);



    const getAllPosts = () => {
        getToken().then((token) =>
            fetch(`/api/post/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setPosts));
    };
    const getAllUserPosts = (id) => {
        getToken().then((token) =>
            fetch(`/api/post/GetAllUserPosts/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setPosts));
    };
    const getSinglePost = (id) =>
        getToken().then((token) =>
            fetch(`/api/post/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
        );

    const addPost = (post) =>
        getToken().then((token) =>
            fetch("/api/post/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(post)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));


    const EditPost = (post) => {
        getToken().then((token) =>
            fetch(`/api/post/${post.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(post),
            }))
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Unauthorized");
            });
    }

    const DeletePost = (id) => {
        getToken().then((token) =>
            fetch(`/api/post/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
    };

    return (
        <PostContext.Provider value={{ posts, getAllPosts, getSinglePost, addPost, getAllUserPosts, DeletePost, EditPost }}>
            {props.children}
        </PostContext.Provider>
    );
};