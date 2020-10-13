import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem, Card, CardImg, CardBody, Button } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { useParams, useHistory, Link } from "react-router-dom";


const ConfirmDelete = () => {
    const [post, setPost] = useState();
    const { getSinglePost, DeletePost } = useContext(PostContext);
    const { postId } = useParams();
    const history = useHistory();
    

    useEffect(() => {
        getSinglePost(postId).then(setPost);
    }, []);

    if (!post) {
        return null;
    }

    if (post.userProfileId === JSON.parse(sessionStorage.getItem("userProfile")).id) {


        return (
            <Card className="m-4">
                
                <h1>Careful now</h1>
                <h2> Are you sure you want to delete "{post.title}"</h2>
                <CardBody>
                    <Button color="info"
                        onClick={() => { history.push(`/posts/${postId}`) }}>
                        No, But thanks for asking
                </Button>
                    <Button color="danger"
                        onClick={() => {
                            DeletePost(postId)
                                .then(() => {
                                    history.push(`/posts/`)
                                })
                        }
                        }
                    >Yes, I hate it!
                </Button>
                </CardBody>
            </Card>
        );
    } else {
        return (
            <h1>Hmmm... I don't think you should be here..</h1>
        )
    }
};


export default ConfirmDelete;