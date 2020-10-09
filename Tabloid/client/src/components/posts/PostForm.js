import React, { useState, useContext } from "react";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
} from "reactstrap";
import { PostContext } from "../providers/PostProvider";
import { useHistory } from "react-router-dom";

const PostForm = () => {
    const { addPost } = useContext(PostContext);
    const [userProfileId, setUserProfileId] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageLocation, setImageLocation] = useState("");
    const [createDateTime, setCreateDateTime] = useState("");
    const [publishDateTime, setPublishDateTime] = useState("");
    const [isApproved, setIsApproved] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const history = useHistory();
    //Title, Content, ImageLocation, CreateDateTime, 
    //PublishDateTime, IsApproved, CategoryId, UserProfileId
    const submit = (e) => {
        const post = {
            title,
            content,
            imageLocation,
            createDateTime,
            publishDateTime,
            isApproved,
            categoryId,
            userProfileId
        };

        setUserProfileId(1);
        setCreateDateTime(Date.now());
        setPublishDateTime();
        setIsApproved();
        //for now...
        setCategoryId(1);

        addPost(post).then((p) => {
            // Navigate the user back to the home route
            history.push("/");
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
                                    onChange={(e) => setImageUrl(e.target.value)}
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

export default PostForm;