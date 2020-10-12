import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem, Card, CardImg, CardBody } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { useParams, useHistory, Link } from "react-router-dom";


const ConfirmDelete = () => {
    const [post, setPost] = useState();
    const { getSinglePost, DeletePost } = useContext(PostContext);
    const { postId } = useParams();
    const history = useHistory();
    console.log("is this the confirmation page???");

    useEffect(() => {
        getSinglePost(postId).then(setPost);
    }, []);

    // const RequestDelete = (id) => {
    //     DeletePost(id).then(() => {
    //         history.push(`/posts/`)
    //     })


    // }

    if (!post) {
        return null;
    }

    if (post.userProfileId === JSON.parse(sessionStorage.getItem("userProfile")).id) {


        return (
            <Card className="m-4">
                <button type="button"
                    onClick={() => { history.push(`/posts/`) }}>
                    Back to list
            </button>
                <h1>Careful now</h1>
                <h2> Are you sure you want to delete "{post.title}"</h2>
                <CardBody>
                    <button type="button"
                        onClick={() => { history.push(`/posts/`) }}>
                        No, But thanks for asking
                </button>
                    <button type="button"
                        onClick={() => {
                            DeletePost(postId)
                                .then(() => {
                                    history.push(`/posts/`)
                                })
                        }
                        }
                    >Yes, I hate it!
                </button>
                </CardBody>
            </Card>
            // <h1>Hello? hello? world? hello?</h1>
        );
    } else {
        return (
            <h1>Hmmm... I don't think you should be here..</h1>
        )
    }
};


export default ConfirmDelete;