import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([]);
    const { getToken } = useContext(UserProfileContext);
    const apiUrl = "/api/comment";


    const getAllComments = () =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setComments));


    const getCommentsByPostId = (id) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/GetCommentsByPostId/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            }).then(res => res.json())
                .then(setComments));



    const deleteComment = (id) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }));

    const getCommentById = (id) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`

                }
            }).then((res) => res.json()));


    const addComment = (comment) =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comment)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));

    const editComment = (comment) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${comment.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comment)
            }));

    return (
        <CommentContext.Provider value={{ comments, getAllComments, getCommentsByPostId, addComment, deleteComment, editComment, getCommentById }}>
            {props.children}
        </CommentContext.Provider>
    );
};
// const editComment = (comment) => {
//     return fetch(`api/comment/${comment.id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(comment)
//     })
// }
// const addComment = (comment) => {
//     return fetch("/api/comment", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(comment)
//     });
// };
// const getAllCommentsToken = () => {
//     return fetch("/api/comment")
//         .then((res) => res.json())
//         .then(setComments);
// };
// const getCommentsByPostId = (id) => {
//     return fetch(`/api/comment/GetCommentsByPostId/${id}`)
//         .then((res) => res.json())
//         .then(setComments);
// };
// const deleteComment = (id) => {
//     return fetch(`/api/comment/${id}`, {
//         method: "DELETE"
//     });
// }
// const getCommentById = (id) => {
//     return fetch(`/api/comment/GetCommentById/${id}`)
//         .then((res) => res.json())
//         .then(setComments);
// }