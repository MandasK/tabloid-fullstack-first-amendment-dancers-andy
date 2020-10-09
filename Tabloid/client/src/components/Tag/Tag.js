import React from 'react'
import { Button } from 'reactstrap'

const Tag = (props) => {

    return (
        <>
        <Button className="tag_Button" color="primary" onClick={() => props.editTag(props.tag.id)}>
            {props.tag.name}
        </Button>
        </>
    )
}
export default Tag