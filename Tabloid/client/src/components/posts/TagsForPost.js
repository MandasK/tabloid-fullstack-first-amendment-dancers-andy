import React, { useContext, useEffect, useState } from "react";
import { TagContext } from "../../providers/TagProvider";
import { Button } from "reactstrap";

const TagsForPost = (props) => {
    const [selectedTags,setSelectedTags] = useState()
    
    const {
        tags,
        GetAllTags
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
        console.log(selectedTags) 

    }
    // const handleFieldChange = (event) => {
    //     const stateToChange = { ...tagToEdit };
    //     stateToChange[event.target.id] = event.target.value;
    //     setTagToEdit(stateToChange);
    //     setSaveButton(true);
    //   };
    

    const saveTags = () => {
        selectedTags.foreach((tag) => {
            
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
                    <div className="form-check" key={tag.id}>
                        <input className="form-check-input" type="checkbox" value={tag.id} id={tag.id} checked={tag.isSelected} onChange={handleFieldChange}/>
                        <label className="form-check-label" htmlFor={tag.id}>
                        {tag.name}
                        </label>
                </div>
                )}
            </form>
        <Button type="submit" className="Post_Tag_Button" color="primary" onClick={() => saveTags()}>Save</Button>
        </div>
        </>
    )
}

export default TagsForPost

// <PostTag
//                         key={tag.id}
//                         selectedTags={selectedTags}                       
//                         tag={tag} 
//                         editTag={editTag} 
//                     />