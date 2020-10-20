import React, { useState, useContext, useEffect, useRef } from "react";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Alert
} from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { useHistory } from "react-router-dom";
import { CategoryContext } from "../../providers/CategoryProvider";
import { ImageContext } from "../../providers/ImageProvider";

const PostForm = () => {
    const { addPost } = useContext(PostContext);
    const { categories, getAllCategories } = useContext(CategoryContext);
    const { uploadImage } = useContext(ImageContext);
    //const [userProfileId, setUserProfileId] = useState("");
    const [imageLocation, setImageLocation] = useState("");
    const [createDateTime, setCreateDateTime] = useState("");
    const [categoryId, setCategoryId] = useState(0);
    const history = useHistory();
    const [imagePreview, setImagePreview] = useState(null);
    const title = useRef();
    const content = useRef();
    const imageUrl = useRef();

    useEffect(() => {
        getAllCategories()
    }, []);

    const previewImage = evt => {
        if (evt.target.files.length) {
            setImagePreview(URL.createObjectURL(evt.target.files[0]));
        }
    };

    const previewImageUrl = evt => {
        if (evt.target.value.length) {
            setImagePreview(evt.target.value);
        }
    }

    const submit = () => {
        const post = {
            title: title.current.value,
            content: content.current.value,
            categoryId,
            //userProfileId: JSON.parse(sessionStorage.getItem("userProfile")).id
        };
        post.categoryId = JSON.parse(post.categoryId)
        if (post.title === "") {
            window.alert("Please add a title")
        }
        if (post.content === "") {
            window.alert("what is a post with no content?")
        }
        if (post.categoryId === 0) {
            window.alert("please select a category")
        }
        // Image Upload
        const file = document.querySelector('input[type="file"]').files[0];

        if (file !== undefined) {
            const fileType = file.name.split('.').pop();

            const availFileTypes = [
                'png',
                'bmp',
                'jpeg',
                'jpg',
                'gif',
                'PNG',
                'BMP',
                'JPEG',
                'GIF',
                'JPG'
            ];

            if (!availFileTypes.includes(fileType)) {
                alert('Accepted Image File Types: .png, .bmp, .jpeg, .jpg, and .gif');
                return;
            }
            else {
                const newImageName = `${new Date().getTime()}.${fileType}`;

                const formData = new FormData();
                formData.append('file', file, newImageName);

                uploadImage(formData, newImageName);
                post.imageLocation = newImageName;
            }
        }
        else if (file === undefined && imageUrl.current.value !== "") {
            post.imageLocation = imageUrl.current.value;
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
                        <Form encType="multipart/form-data">
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input
                                    id="title"
                                    innerRef={title}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="content">Content</Label>
                                <Input type="textarea" rows="10" id="content" innerRef={content} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="imageUpload">Upload an Image</Label>
                                <Input
                                    type="file"
                                    name="file"
                                    id="imageUpload"
                                    onChange={previewImage}
                                    onClick={() => imageUrl.current.value = ""} />
                                <InputGroup className="mt-2">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>OR</InputGroupText>
                                    </InputGroupAddon>

                                    <Input
                                        type="text"
                                        name="imageUrl"
                                        id="imageUrl"
                                        innerRef={imageUrl}
                                        placeholder="Input an Image URL"
                                        onChange={previewImageUrl}

                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                {
                                    imagePreview === null ?
                                        <Alert color="light">No image provided.</Alert>
                                        : <img src={imagePreview} alt="preview" className="img-thumbnail" />
                                }
                            </FormGroup>
                            <FormGroup>
                                <Label for="categoryId">Category</Label>
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
                        <Button color="info"
                            onClick={() => { history.push(`/posts/`) }}>
                            Cancel
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default PostForm;