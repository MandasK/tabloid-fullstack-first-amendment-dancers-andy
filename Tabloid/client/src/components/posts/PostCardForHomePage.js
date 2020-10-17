import React from 'react';

import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap'

const PostCardForHomePage = (props) => {
    //Give each 'Post card' a unique targetable div
    let classid = `post_Card_Homepage${props.index}`

    return (
        <div className={classid}>
            <div>
                <div className="picAndTitle">
                    <h4 className="postTitle">{props.post.title}</h4>
                    { props.goodImage && 
                        <img src={props.post.imageLocation} alt="Post image" onError={props.badImage}/>
                    }   
                </div>
                <div className="postBody">
                    <p>{props.post.content}</p>
                </div>
            </div>
        </div>
    )
}

export default PostCardForHomePage
