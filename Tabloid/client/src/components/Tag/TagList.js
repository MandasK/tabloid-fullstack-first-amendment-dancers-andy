import React, { useContext, useEffect } from 'react';
import { TagContext } from "../../providers/TagProvider";
import Tag from "./Tag"

const TagList = (props) => {
const { tags, GetAllTags } = useContext(TagContext)

useEffect(() => {
    GetAllTags();
}, [])
console.log(tags)
    return (
        <>
        <h2>Available tags</h2>
        <h5>Click to edit</h5>
        {tags.map((tag) => (
            <Tag key={tag.id} tag={tag}/>
        
        ))}
        </>
    )
}

export default TagList