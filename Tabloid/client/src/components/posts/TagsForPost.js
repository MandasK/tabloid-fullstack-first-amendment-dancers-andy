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
        AddPostTag
        } = useContext(TagContext)
    
    const addIsSelected = () => {
        let tempArray = tags.map((tag) => {

            if(props.postTags !== undefined){
                if(props.postTags.find( item => item.tagId === tag.id) !== undefined){
                    tag.isSelected = true
                    tag.changed = false

                }
            }
            else{
                tag.isSelected = false
                tag.changed = false
            }
            return tag
        })
        setSelectedTags(tempArray)
        console.log(tempArray)
    }
    const handleFieldChange = (e) => {
        e.preventDefault()
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
            //Check to see if the state of the PostTag has been changed

            if (tag.isSelected === true && tag.changed === true){
                let postTag = {
                    postId: props.postId,
                    tagId: tag.id
                }
                AddPostTag(postTag)
            }
            else if (tag.isSelected === false && tag.changed === true){
                let postTag = {
                    postId: props.postId,
                    tagId: tag.id
                }
                DeletePostTag(postTag)
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