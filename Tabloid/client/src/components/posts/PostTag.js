import React from 'react'
import { Button } from 'reactstrap'

const Tag = (props) => {

    return (
        <>
        <Button size="sm" className="post_Tag_Button" color="primary" onClick={() => props.tagButtonClick(props.tag.tagId)}>
            {props.tag.name}
        </Button>
        </>
    )
}
export default Tag