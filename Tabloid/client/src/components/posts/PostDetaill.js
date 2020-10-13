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
            <strong>{post.title}</strong>
            <p className="text-left px-2">By {post.userProfile.displayName}</p>
            <CardImg top src={post.imageLocation} alt={post.title} />
            <CardBody>
                <p>{post.content}</p>
                <p>{HumanPublishDate}</p>
                <Link to={`/posts/${post.id}/comments`}><Button className="postCommentButton"
                >Comments</Button></Link>

                <Button type="button"
                    onClick={() => { history.push(`/posts/`) }}>
                    Post List
                </Button>


                
                {JSON.parse(sessionStorage.getItem("userProfile")).id === post.userProfileId && <Button color="danger"
                
                onClick={() => { history.push(`/posts/delete/${postId}`) }}>
                        Delete
                         
                </Button >}
                {JSON.parse(sessionStorage.getItem("userProfile")).id === post.userProfileId && <Button color="info"
                
                onClick={() => { history.push(`/posts/edit/${postId}`) }}>
                        Edit
                         
                </Button >}
                
            </CardBody >
        </Card >
    );
};


export default PostDetail;