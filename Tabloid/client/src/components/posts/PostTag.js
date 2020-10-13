import React, { useState } from 'react'
import { Button } from 'reactstrap'

const PostTag = (props) => {
    const [buttonColor,setButtonColor] = useState("secondary")
    
    if (props.tag.isSelected === true) {
        setButtonColor("primary")
    }

    return (       
        <Button className="tag_Button" color={buttonColor} onClick={() => props.editTag(props.tag.id)}>
            {props.tag.name}
        </Button>      
    )
}
export default PostTag