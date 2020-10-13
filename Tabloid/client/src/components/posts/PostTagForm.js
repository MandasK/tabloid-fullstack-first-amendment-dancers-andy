import React from 'react'

const PostTagForm = (props) => {


    return (       
        <div className="form-check" key={props.tag.id}>
            <input className="form-check-input" type="checkbox" value={props.tag.id} id={props.tag.id} checked={props.tag.isSelected} onChange={props.handleFieldChange}/>
            <label className="form-check-label" htmlFor={props.tag.id}>
            {props.tag.name}
            </label>
        </div>
    )
}
export default PostTagForm

