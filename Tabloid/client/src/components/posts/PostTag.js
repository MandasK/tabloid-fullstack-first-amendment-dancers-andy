import React from 'react'
import { Button } from 'reactstrap'

const Tag = (props) => {

    return (
        <>
        <Button size="sm" className="tag_Button" color="primary" >
            {props.tag.tagName}
        </Button>
        </>
    )
}
export default Tag