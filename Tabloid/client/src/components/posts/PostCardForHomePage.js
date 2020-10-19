import React from 'react';
import { Link } from 'react-router-dom';

const PostCardForHomePage = (props) => {
    //Give each 'Post card' a unique targetable div
    let classid = `post_Card_Homepage${props.index}`

    return (
        <div className={classid}>
            <div>
                <div className="picAndTitle">
                    <Link to={`/posts/${props.post.id}`}>
                        <h4 className="postTitle">{props.post.title}</h4>
                    </Link>
                        <img src={props.post.imageLocation} alt="Post image" onError={props.addDefaultSrc}/>                 
                </div>
                <div className="postBody">
                    <p>{props.post.content}</p>
                </div>
            </div>
        </div>
    )
}

export default PostCardForHomePage
