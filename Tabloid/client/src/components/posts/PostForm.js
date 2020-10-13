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
import { useHistory } from "react-router-dom";
import { CategoryContext } from "../../providers/CategoryProvider";

const PostForm = () => {
    const { addPost } = useContext(PostContext);
    const { categories, getAllCategories } = useContext(CategoryContext);
    const [userProfileId, setUserProfileId] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageLocation, setImageLocation] = useState("");
    const [createDateTime, setCreateDateTime] = useState("");
    const [categoryId, setCategoryId] = useState(0);
    const history = useHistory();
    //const [categories, setCategories] = useState();

    useEffect(() => {
        getAllCategories()
    }, []);

    const submit = () => {
        const post = {
            title,
            content,
            imageLocation,
            categoryId,
            userProfileId: JSON.parse(sessionStorage.getItem("userProfile")).id
        };
        post.categoryId = JSON.parse(post.categoryId)
        if (post.title === "") {
            window.alert("Please add a title")
        }
        if (post.content === "") {
            window.alert("what is a post with no content?")
        }
        // if (post.imageLocation === "") {
        //     post.imageLocation = post.imageLocation
        // }
        if (post.categoryId === 0) {
            window.alert("please select a category")
        }
        if (post.title !== "" && post.content !== "" && post.categoryId !== 0) {
            addPost(post).then((res) => {
                history.push(`/posts/${res.id}`);
            });
        }

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

                            <FormGroup>
                                <Label for="categoryId">category</Label>
                                <select defaultValue="" name="categoryId" id="categoryId" className="form-control" onChange={(e) => setCategoryId(e.target.value)}>
                                    <option value="0">Select a Category</option>
                                    {categories.map(e => (
                                        <option key={e.id} value={e.id}>
                                            {e.name}
                                        </option>
                                    ))}
                                </select>
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