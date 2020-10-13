import React, { useState } from 'react'
import { Button } from 'reactstrap'

const PostTag = (props) => {
    const [buttonColor,setButtonColor] = useState("secondary")
    
    if (props.tag.isSelected === true) {
        setButtonColor("primary")
    }

    return (       
        <div className="form-check" key={props.tag.id}>
            <input className="form-check-input" type="checkbox" value={props.tag.id} id={props.tag.id} checked={props.tag.isSelected} onChange={props.handleFieldChange}/>
            <label className="form-check-label" htmlFor={props.tag.id}>
            {props.tag.name}
            </label>
        </div>
    )
}
export default PostTag

{/* <Button className="tag_Button" color={buttonColor} onClick={() => props.editTag(props.tag.id)}>
{props.tag.name}
</Button> */}