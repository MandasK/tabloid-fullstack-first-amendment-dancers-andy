import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem, Card, CardImg, CardBody, Button } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { useParams, useHistory, Link } from "react-router-dom";


const PostDetail = () => {
    const [post, setPost] = useState();
    const { getSinglePost } = useContext(PostContext);
    const { postId } = useParams();
    const history = useHistory();


    useEffect(() => {
        getSinglePost(postId).then(setPost);
    }, []);

    if (!post) {
        return null;
    }


    //convert publication date to MM / DD / YYYY

    const publishDate = new Date(post.publishDateTime)
    const HumanPublishDate = `${publishDate.getMonth() + 1}/${publishDate.getDate()}/${publishDate.getFullYear()}`


    return (
        <Card className="m-4">
            <button type="button"
                onClick={() => { history.push(`/posts/`) }}>
                Back to list
            </button>
            <strong>{post.title}</strong>
            <p className="text-left px-2">By {post.userProfile.displayName}</p>
            {/* <p className="text-left px-2">Posted by: {post.userProfile.firstName}</p> */}
            <CardImg top src={post.imageLocation} alt={post.title} />
            <CardBody>
                {/* /posts/edit/:postId(\d+) */}
                <p>{post.content}</p>
                <p>{HumanPublishDate}</p>
                <Link to={`/posts/${post.id}/comments`}><Button className="postCommentButton" color="danger">Comments</Button></Link>

                <button type="button"
                    onClick={() => { history.push(`/posts/`) }}>
                    Back to list
                </button>


                
                {JSON.parse(sessionStorage.getItem("userProfile")).id === post.userProfileId && <button type="button"
                
                onClick={() => { history.push(`/posts/delete/${postId}`) }}>
                        Delete
                         
                </button >}
                {JSON.parse(sessionStorage.getItem("userProfile")).id === post.userProfileId && <button type="button"
                
                onClick={() => { history.push(`/posts/edit/${postId}`) }}>
                        Edit
                         
                </button >}
                
            </CardBody >
        </Card >
    );
};


export default PostDetail;