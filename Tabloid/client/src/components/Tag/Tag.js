import React from 'react'
import { Button } from 'reactstrap'

const Tag = (props) => {
console.log(props)
    return (
        <>
        <Button>
            {props.tag.name}
        </Button>
        </>
    )
}
export default Tag