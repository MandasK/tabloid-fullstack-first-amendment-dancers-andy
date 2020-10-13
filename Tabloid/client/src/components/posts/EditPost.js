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
    const [isLoading, setIsLoading] = useState(false);
    //Title, Content, ImageLocation, CreateDateTime, 
    //PublishDateTime, IsApproved, CategoryId, UserProfileId

    
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
            categoryId: 1,
            userProfileId: post.userProfileId
        }
        //console.log("before edit", updatedPost)
        EditPost(updatedPost)
        .then(() => history.push("/my_posts/"));
        //console.log("post", post)
        // .then(() => setPost(updatedPost))
        //console.log("post again", post)
        //console.log("updatedPost", updatedPost)
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
                            <Button
                            color="info"
                            disabled={isLoading}
                            onClick={submit}
                        >Submit</Button>
                            {/* <Button color="info" onClick={event => {
                                event.preventDefault();
                                submit();
                            }}>
                                SUBMIT
                        </Button> */}
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