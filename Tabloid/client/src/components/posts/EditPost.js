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
import { useHistory, useParams } from "react-router-dom";
import { CategoryContext } from "../../providers/CategoryProvider";
import {ImageContext} from "../../providers/ImageProvider";

const EditPost = () => {
    const { EditPost, getSinglePost } = useContext(PostContext);
    const [post, setPost] = useState();
    const { categories, getAllCategories } = useContext(CategoryContext);
    const { uploadImage } = useContext(ImageContext);
    const [categoryId, setCategoryId] = useState(0);
    const history = useHistory();
    const { postId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
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
    
    const submit = event => {
        event.preventDefault();
        setIsLoading(true);
        const updatedPost = {
            id: post.id,
            title: title.current.value,
            content: content.current.value,
            createDateTime: post.createDateTime,
            publishDateTime: post.publishDateTime,
            isApproved: post.isApproved,
            categoryId,
            userProfileId: post.userProfileId
        }
        updatedPost.categoryId = JSON.parse(updatedPost.categoryId)
        if (updatedPost.title === ""){
            updatedPost.title = post.title
        }
        if (updatedPost.content === ""){
            updatedPost.content = post.content
        }
        if (updatedPost.categoryId === 0){
            updatedPost.categoryId = post.categoryId
        }

        const file = document.querySelector('input[type="file"]').files[0];
        let newImageName = ""
        if(file !== undefined)
        {
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

            if(!availFileTypes.includes(fileType)) {
                alert('Accepted Image File Types: .png, .bmp, .jpeg, .jpg, and .gif');
                return;
            }
            else {
                const newImageName = `${new Date().getTime()}.${fileType}`;

                const formData = new FormData();
                formData.append('file', file, newImageName);

                uploadImage(formData, newImageName);
                updatedPost.imageLocation = newImageName;
            }
        }
        else if (file === undefined && imageUrl.current.value !== "") {
            updatedPost.imageLocation = imageUrl.current.value;
        }
        else {
            updatedPost.imageLocation = post.imageLocation;
        }
        
        EditPost(updatedPost)
        .then(() => history.push(`/posts/${post.id}`));
    };

    useEffect(() => {
        getSinglePost(postId).then((res)=>{
            setPost(res)
            setIsLoading(false);
        });
    }, []);
    
    if (!post) {
        return null;
    }
    
    if (post.userProfileId === JSON.parse(sessionStorage.getItem("userProfile")).id) {
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
                                        defaultValue={post.title}
                                        innerRef={title}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="content">Content</Label>
                                    <Input 
                                        id="content" 
                                        type="textarea" 
                                        rows="10" 
                                        defaultValue={post.content} 
                                        innerRef={content} />
                                </FormGroup>
                                <FormGroup>
                                <Label for="imageUpload">Upload an Image</Label>
                                <Input
                                    type="file"
                                    name="file"
                                    id="imageUpload"
                                    defaultValue=""
                                    onChange={e => previewImage(e)}
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
                                                defaultValue={post.imageLocation !== null ? (post.imageLocation.startsWith("http") ? post.imageLocation : "") : ""}
                                                onChange={previewImageUrl}
                                                
                                            />
                                </InputGroup> 
                                </FormGroup>
                                <FormGroup>
                                {
                                    imagePreview === null ?
                                    <Alert color="light">No new image provided.</Alert>
                                    : <img src={imagePreview} alt="preview" className="img-thumbnail" />
                                }
                                </FormGroup>
                                <FormGroup>
                                <Label for="categoryId">category</Label>
                                <select defaultValue="" 
                                        name="categoryId" 
                                        id="categoryId" 
                                        className="form-control" 
                                        onChange={(e) => setCategoryId(e.target.value)}>
                                    
                                <option defaultValue={post.categoryId} hidden>{post.category.name}</option>
                                    {categories.map(e => (
                                        <option key={e.id} value={e.id}>
                                            {e.name}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>
                            </Form>
                            <Button
                            color="info"
                            style={{margin: 10}}
                            disabled={isLoading}
                            onClick={submit}
                             >Submit
                            </Button>
                            <Button color="info"
                            style={{margin: 10}}
                                disabled={isLoading}
                                onClick={() => { history.push(`/posts/${post.id}`) }}>
                                Cancel
                        </Button>
                        </CardBody>
                    </Card>
                </div>
            </div>
        );
        } else {
                return (
                    <h1>Hmmm... I don't think you should be here..</h1>
                )
            }
    };

    export default EditPost;