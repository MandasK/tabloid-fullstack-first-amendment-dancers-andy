import React, { useContext, useEffect, useState } from "react";
import { TagContext } from "../../providers/TagProvider";
import PostTagForm from "./PostTagForm"
import { Button } from "reactstrap";

const TagsForPost = (props) => {
    const [selectedTags,setSelectedTags] = useState()
    const [save, setSave] = useState(false)
    
    const {
        tags,
        GetAllTags,
        AddPostTag,
        DeletePostTag
        } = useContext(TagContext)
    
    const addIsSelected = () => {
        let tempArray = tags.map((tag) => {
                tag.isSelected = false
                tag.changed = false
            if(props.postTags !== undefined){
                if(props.postTags.find( item => item.tagId === tag.id) !== undefined){
                    tag.isSelected = true
                    tag.changed = false
                    
                    }           
                }
            return tag
        })
        setSelectedTags(tempArray)
    }
    const handleFieldChange = (e) => {
        let tempArray = [...selectedTags]
        const target = e.target.checked    
        let index = selectedTags.findIndex(tag => tag.id == e.target.id)
        tempArray[index].isSelected = target
        tempArray[index].changed = true
        setSelectedTags(tempArray) 
        setSave(true) 
    }
    

    const saveTags = () => {
        selectedTags.forEach(tag => {
            //Check to see if the state of this PostTag has been changed
            if (tag.changed === true) {
                //if it has changed, run the PostTag Add or Delete as appropriate
                if (tag.isSelected === true){
                    let postTag = {
                        postId: props.postId,
                        tagId: tag.id
                    }
                    AddPostTag(postTag)
                }
                else if (tag.isSelected === false){
                    let postTag = {
                        postId: props.postId,
                        tagId: tag.id
                    }
                    DeletePostTag(tag.id, props.postId)
                }
            }
        })
        props.GetPostTags(props.postId)
        setSave(false)
        props.setShowTags(false)
    }

    useEffect(() => {
        GetAllTags()
    }, [])

    useEffect(() => {
        addIsSelected()
    }, [tags])

    return (
        <>
        <div className="Post_Tag_Popup">
            <h3>Click to Select/Deselect Tags</h3>
            <form>
                { (selectedTags !== undefined) && selectedTags.map((tag) =>
                  <PostTagForm
                  key={tag.id}
                  selectedTags={selectedTags}                       
                  tag={tag} 
                  handleFieldChange={handleFieldChange} 
                  /> 
                  )}
            </form>
            <Button type="submit" className="Post_Tag_Save_Button" color="danger" disabled={!save} onClick={() => saveTags()}>Save Changes</Button>
            <Button className="Post_Tag_Save_Button" color="primary" onClick={() => props.setShowTags(false)}>Cancel</Button>
        </div>
        </>
    )
}

export default TagsForPost
