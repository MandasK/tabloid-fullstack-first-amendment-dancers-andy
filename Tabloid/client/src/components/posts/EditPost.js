import React, { useState, useContext, useEffect } from "react";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
} from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { useHistory, useParams } from "react-router-dom";

const EditPost = () => {
    const { EditPost, getSinglePost } = useContext(PostContext);
    const [post, setPost] = useState();
    const [userProfileId, setUserProfileId] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageLocation, setImageLocation] = useState("");
    const [createDateTime, setCreateDateTime] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const history = useHistory();
    const { postId } = useParams();
    //Title, Content, ImageLocation, CreateDateTime, 
    //PublishDateTime, IsApproved, CategoryId, UserProfileId

    useEffect(() => {
        getSinglePost(postId).then(setPost);
    }, []);
    const submit = (e) => {
        const updatedPost = {
            id: post.id,
            title,
            content,
            imageLocation,
            createDateTime: post.createDateTime,
            publishDateTime: post.publishDateTime,
            isApproved: post.isApproved,
            categoryId: 1,
            userProfileId: JSON.parse(sessionStorage.getItem("userProfile")).id
        };


        EditPost(updatedPost).then((p) => {
            // Navigate the user back to the home route
            history.push("/my_posts");
        });
    };

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input
                                    id="title"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="content">Content</Label>
                                <Input id="content" onChange={(e) => setContent(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="imageLocation">Image</Label>
                                <Input
                                    id="imageLocation"
                                    onChange={(e) => setImageLocation(e.target.value)}
                                />
                            </FormGroup>
                            {/* <FormGroup>
                                <Label for="categoryId">categoryId</Label>
                                <Input
                                    id="categoryId"
                                    onChange={(e) => setCategoryId(e.target.value)}
                                />
                            </FormGroup> */}
                        </Form>
                        <Button color="info" onClick={submit}>
                            SUBMIT
            </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default EditPost;