import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem, Card, CardImg, CardBody } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { useParams, useHistory, Link } from "react-router-dom";


const ConfirmDelete = () => {
    const [post, setPost] = useState();
    const { getSinglePost } = useContext(PostContext);
    const { postId } = useParams();
    const history = useHistory();
    console.log("is this the confirmation page???");

    // useEffect(() => {
    //     getSinglePost(postId).then(setPost);
    // }, []);

    if (!post) {
        return null;
    }


    //convert publication date to MM / DD / YYYY

    const publishDate = new Date(post.publishDateTime)
    console.log("is this the confirmation page???");
    const HumanPublishDate = `${publishDate.getMonth() + 1}/${publishDate.getDate()}/${publishDate.getFullYear()}`


    return (
        // <Card className="m-4">
        //     <button type="button"
        //         onClick={() => { history.push(`/posts/`) }}>
        //         Back to list
        //     </button>
        //     <h1>Careful now</h1>
        //     <h2> Are you sure you want to delete {post.title}</h2>
        //     <CardBody>
        //         <button type="button"
        //             onClick={() => { history.push(`/posts/`) }}>
        //             No, But thanks for asking
        //         </button>
        //     </CardBody>
        // </Card>
        <h1>hi there? hello?</h1>
    );
};


export default ConfirmDelete;