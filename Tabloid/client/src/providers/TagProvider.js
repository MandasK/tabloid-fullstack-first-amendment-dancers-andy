import React, { useState, useEffect, useContext, createContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const TagContext = createContext();

export const TagProvider = (props) => {
  const { getToken } = useContext(UserProfileContext);
  const [tags, setTags] = useState([]);
  const [tagToEdit, setTagToEdit] = useState();

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

  return (
    <TagContext.Provider value={{ tags, tagToEdit, GetAllTags, GetTagById }}>
      {props.children}
    </TagContext.Provider>
  );
};
