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
import { CategoryContext } from "../../providers/CategoryProvider";

const EditPost = () => {
    const { EditPost, getSinglePost } = useContext(PostContext);
    const [post, setPost] = useState();
    const { categories, getAllCategories } = useContext(CategoryContext);
    const [userProfileId, setUserProfileId] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageLocation, setImageLocation] = useState("");
    const [createDateTime, setCreateDateTime] = useState("");
    const [categoryId, setCategoryId] = useState(0);
    const history = useHistory();
    const { postId } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getAllCategories()
    }, []);

    
    
    const submit = event => {
        event.preventDefault();
        setIsLoading(true);
        const updatedPost = {
            id: post.id,
            title,
            content,
            imageLocation,
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
        if (updatedPost.imageLocation === ""){
            updatedPost.imageLocation = post.imageLocation
        }
        if (updatedPost.categoryId === 0){
            updatedPost.categoryId = post.categoryId
        }
        debugger
        EditPost(updatedPost)
        .then(() => history.push("/my_posts/"));
    };

    useEffect(() => {
        getSinglePost(postId).then((res)=>{
            console.log(res)
            setPost(res)
            setIsLoading(false);
        });
    }, []);
    
    if (!post) {
        return null;
    }
    console.log("post again", post)
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
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="content">Content</Label>
                                    <Input id="content" defaultValue={post.content} onChange={(e) => setContent(e.target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="imageLocation">Image</Label>
                                    <Input
                                        id="imageLocation"
                                        defaultValue={post.imageLocation}
                                        onChange={(e) => setImageLocation(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                <Label for="categoryId">category</Label>
                                <select defaultValue="" name="categoryId" id="categoryId" className="form-control" onChange={(e) => setCategoryId(e.target.value)}>
                                    
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
                            disabled={isLoading}
                            onClick={submit}
                             >Submit
                            </Button>
                            <Button color="info"
                                disabled={isLoading}
                                onClick={() => { history.push(`/my_posts/`) }}>
                                Back to My Posts
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