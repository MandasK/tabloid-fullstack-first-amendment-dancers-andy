import React, { useState } from "react";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([]);

    const getAllComments = () => {
        console.log("getting all the comments");
        return fetch("/api/comment")
            .then((res) => res.json())
            .then(setComments);
    };

    const getCommentsByPostId = (id) => {
        return fetch(`/api/comment/GetCommentsByPostId/${id}`)
            .then((res) => res.json())
            .then(setComments);
    };

    const deleteComment = (id) => {
        return fetch(`/api/comment/${id}`, {
            method: "DELETE"
        });

    }
    const getCommentById = (id) => {
        return fetch(`/api/comment/GetCommentById${id}`)
            .then((res) => res.json())
            .then(setComments);
    }

    const addComment = (comment) => {
        
        return fetch("/api/comment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(comment)
        });
      };

      const editComment = (comment) =>{
          return fetch(`api/comment/${comment.id}`, {
              method: "PUT",
              headers: {
                  "Content-Type" : "application/json"
              },
              body: JSON.stringify(comment)
          })
      }



    return (
        <CommentContext.Provider value={{ comments, getAllComments, getCommentsByPostId, addComment, deleteComment, editComment }}>
            {props.children}
        </CommentContext.Provider>
    );

};