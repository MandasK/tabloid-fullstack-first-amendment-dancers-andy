import React, { useState, useContext, createContext, useEffect } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const TagContext = createContext();

export const TagProvider = (props) => {
  const { getToken } = useContext(UserProfileContext);
  const [tags, setTags] = useState([]);
  const [tagToEdit, setTagToEdit] = useState();
  const [postTags,setPostTags] = useState([]);
  const [tagSearchId, setTagSearchId] = useState()
  const [update, setUpdate] = useState(false)
  const [tagsLoaded, setTagsLoaded] = useState(false)

  const GetAllTags = () => {
    getToken().then((token) =>
      fetch("/api/tag", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setTags)          
    );
  };

  useEffect(() => {
    setTagsLoaded(!tagsLoaded)
  },[tags])

  const GetTagById = (id) => {
    getToken().then((token) =>
      fetch(`/api/tag/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(setTagToEdit)
    );
  };

  const AddTag = (tag) => {
    getToken().then((token) => 
    fetch(`/api/tag/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tag)
    }))
    .then((response) => {
      if (response.ok) {
        setUpdate(!update)
        return response.json();
      }
      throw new Error("Unauthorized");
    });
  }

  const UpdateTag = (tag) => {
    getToken().then((token) => 
    fetch(`/api/tag/${tag.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    }))
    .then((response) => {
      if (response.ok) {
          setUpdate(!update)
        return response.json();
      }
      throw new Error("Unauthorized");
    });
  }

  const DeleteTag = (id) => {
    getToken().then((token) =>
    fetch(`/api/tag/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }))
    .then((response) => {
      
          setUpdate(!update)
      
    });
  }

  const GetPostTags = (postId) => {
    getToken().then((token) =>
      fetch(`/api/posttag/${postId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setPostTags)
    );
  };

  const AddPostTag = (postTag) => {
    getToken().then((token) => 
    fetch(`/api/posttag/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postTag)
    }))
    .then((response) => {
      if (response.ok) {
        return null;
      }
      throw new Error("Unauthorized");
    });
  }

  const DeletePostTag = (tagId, postId) => {
    getToken().then((token) =>
    fetch(`/api/posttag/${tagId}/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }))
  }

  return (
    <TagContext.Provider
      value={{ tags, tagToEdit, setTagToEdit, postTags, tagSearchId, setTagSearchId, update, tagsLoaded, setTagsLoaded, setUpdate, GetAllTags, GetTagById, AddTag, UpdateTag, DeleteTag, AddPostTag, GetPostTags, DeletePostTag }}
    >
      {props.children}
    </TagContext.Provider>
  );
};
