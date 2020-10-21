import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ImageContext } from '../../providers/ImageProvider';
import Newspaper from '../Images/Newspaper.png'
const PostCardForHomePage = (props) => {
    //Set the image into state so it can be updated if it returns broken
    const [image, setImage] = useState(props.post.imageLocation)
    const {getImageUrl} = useContext(ImageContext)
    
    useEffect(()=> {
        if (props.post.imageLocation !== "" && props.post.imageLocation !== undefined && props.post.imageLocation !== null){
          if (props.post.imageLocation[0].toLowerCase() !== "h" ){
               setImage(getImageUrl(props.post.imageLocation))
           }
        }
    }, [])

    //Give each 'Post card' a unique targetable div
    let classid = `post_Card_Homepage${props.index}`
    if (props.index>2){
        classid = `post_Card_Homepage3`
    }

    //update image state to default image if the link comes back broken.
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
