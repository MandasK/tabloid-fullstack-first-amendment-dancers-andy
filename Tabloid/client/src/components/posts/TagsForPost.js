import React, { useContext, useEffect, useState } from "react";
import { TagContext } from "../../providers/TagProvider";
import PostTag from "./PostTag"
import { Button } from "reactstrap";

const TagsForPost = (props) => {
    const [selectedTags,setSelectedTags] = useState()
    
    const {
        tags,
        GetAllTags,
        AddPostTag
        } = useContext(TagContext)
    
    const addIsSelected = () => {
        let tempArray = tags.map((tag) => {
            tag.isSelected = false
            return tag
        })
        setSelectedTags(tempArray)
    }
    const handleFieldChange = (e) => {
        e.preventDefault()
        let tempArray = selectedTags
        const target = e.target.checked 
        let select = false
        if (target == true) {
            select = true
        }
        console.log(target)
        let index = selectedTags.findIndex(tag => tag.id == e.target.id)
        tempArray[index].isSelected = target
        setSelectedTags(tempArray)  
    }
    

    const saveTags = () => {

        selectedTags.forEach(tag => {
            if (tag.isSelected === true){
                let postTag = {
                    postId: props.postId,
                    tagId: tag.id
                }
                AddPostTag(postTag)
            }
        })
    }

    useEffect(() => {
        GetAllTags()
    }, [])

    useEffect(() => {
        addIsSelected()
    }, [tags])

    return (
        <>
        <Button className="Post_Tag_Button" color="primary" onClick={() => props.setShowTags(false)}>Cancel</Button>
        <div className="Post_Tag_Popup">
            <h3>Click to Select/Deselect</h3>
            <form>
                { (selectedTags !== undefined) && selectedTags.map((tag) =>
                  <PostTag
                        key={tag.id}
                        selectedTags={selectedTags}                       
                        tag={tag} 
                        handleFieldChange={handleFieldChange} 
              /> 
                )}
            </form>
        <Button type="submit" className="Post_Tag_Button" color="primary" onClick={() => saveTags()}>Save</Button>
        </div>
        </>
    )
}

export default TagsForPost



{/* <div className="form-check" key={tag.id}>
<input className="form-check-input" type="checkbox" value={tag.id} id={tag.id} checked={tag.isSelected} onChange={handleFieldChange}/>
<label className="form-check-label" htmlFor={tag.id}>
{tag.name}
</label>
</div> */}