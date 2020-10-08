import React, { useState, useEffect, useContext, createContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const TagContext = createContext();

export const TagProvider = (props) => {
  const { getToken } = useContext(UserProfileContext);
  const [tags, setTags] = useState([]);

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

  return (
    <TagContext.Provider value={{ tags, GetAllTags }}>
      {props.children}
    </TagContext.Provider>
  );
};
