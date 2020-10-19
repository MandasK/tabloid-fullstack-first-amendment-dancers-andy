import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Newspaper from '../Images/Newspaper.png'
const PostCardForHomePage = (props) => {
    const [image, setImage] = useState(props.post.imageLocation)
    //Give each 'Post card' a unique targetable div
    let classid = `post_Card_Homepage${props.index}`

    const addDefaultSrc = () => {
        setImage(Newspaper)
    }

    return (
        <div className={classid}>
            <div>
                <div className="picAndTitle">
                    <Link to={`/posts/${props.post.id}`}>
                        <h4 className="postTitle">{props.post.title}</h4>
                    </Link>                    
                        <img className="home_Post_Image" src={image} alt="Post image" onError={addDefaultSrc}/>                   
                </div>
                <div className="postBody">
                    <p>{props.post.content}</p>
                </div>
            </div>
        </div>
    )
}

export default PostCardForHomePage
