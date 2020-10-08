import React, { useState, useEffect, createContext } from "react";

export const TagContext = createContext();

export const TagProvider = (props) => {
  const [tags, setTags] = useState();

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

  return <TagContext.Provider value={{ GetAllTags }}></TagContext.Provider>;
};
