import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap'

const PostCardForHomePage = (props) => {
    console.log(props)
    let classid = `post_Card_Homepage${props.index}`

    return (
        <div className={classid}>
            <Card>
                <CardImg top width="100%" src={props.post.imageLocation} alt="Card image cap" />
                <CardBody>
                    <CardTitle>{props.post.title}</CardTitle>
                    <CardSubtitle>{props.post.category.name}</CardSubtitle>
                    <CardText>{props.post.content}</CardText>
                    <Button>Button</Button>
                </CardBody>
            </Card>
        </div>
    )
}

export default PostCardForHomePage