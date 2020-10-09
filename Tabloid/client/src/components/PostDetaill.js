import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem, Card, CardImg, CardBody } from "reactstrap";
import { PostContext } from "../providers/PostProvider";
import { useParams } from "react-router-dom";
//import Post from "./Post";

const PostDetail = () => {
    const [post, setPost] = useState();
    const { getSinglePost } = useContext(PostContext);
    const { postId } = useParams();


    useEffect(() => {
        getSinglePost(postId).then(setPost);
    }, []);

    if (!post) {
        return null;
    }




    //convert publication date to MM / DD / YYYY
    const publishDate = new Date(post.publishDateTime)
    console.log(publishDate);
    const HumanPublishDate = `${publishDate.getMonth() + 1}/${publishDate.getDate()}/${publishDate.getFullYear()}`


    return (
        <Card className="m-4">
            <strong>{post.title}</strong>
            <p className="text-left px-2">By {post.userProfile.displayName}</p>
            {/* <p className="text-left px-2">Posted by: {post.userProfile.firstName}</p> */}
            <CardImg top src={post.imageLocation} alt={post.title} />
            <CardBody>

                <p>{post.content}</p>
                <p>{HumanPublishDate}</p>
                {/* <button type="button"
                    onClick={() => { history.push(`/posts/${post.id}`) }}>
                    View Post
                            </button> */}

            </CardBody>
        </Card>
    );
};


export default PostDetail;