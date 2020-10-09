import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem, Card, CardImg, CardBody } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { useParams, useHistory } from "react-router-dom";


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
    console.log(publishDate);
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

                <p>{post.content}</p>
                <p>{HumanPublishDate}</p>
                <button type="button"
                    onClick={() => { history.push(`/posts/`) }}>
                    Back to list
                </button>

            </CardBody>
        </Card>
    );
};


export default PostDetail;