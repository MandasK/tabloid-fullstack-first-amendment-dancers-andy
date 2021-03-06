import React, { useContext, useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input, Card, CardBody } from "reactstrap";

import { CommentContext } from "../../providers/CommentProvider";
import { useParams, useHistory, Link } from 'react-router-dom';
import "./Comment.css"

const CommentEditForm = () => {

    const { commentId, postId } = useParams();
    const { getCommentById, addComment, editComment } = useContext(CommentContext);
    const [userProfileId, setUserProfileId] = useState();

    const history = useHistory();
    const [comment, setComment] = useState({ userProfileId: "", postId: "", subject: "", content: "", createDateTime: "" });
    const [updatedComment, setUpdatedComment] = useState();
    const currentUser = JSON.parse(sessionStorage.getItem('userProfile')).id;
    useEffect(() => {
        getCommentById(commentId).then(setComment);
    }, []);



    const submit = (evt) => {
        evt.preventDefault();
        const updatedComment =
        {
            id: comment.id,
            userProfileId: comment.userProfileId,
            postId: comment.postId,
            subject: comment.subject,
            content: comment.content,
            createDateTime: comment.createDateTime
        }


        editComment(updatedComment).then(() =>
            history.push(`/posts/${comment.postId}/comments`))

    }

    const handleFieldChange = evt => {
        const stateToChange = { ...comment }
        stateToChange[evt.target.id] = evt.target.value
        setComment(stateToChange)
        // console.log(evt.target.id)
        // console.log(evt.target.value)
        // console.log(comment)
    }

    if (!comment) {
        return null;
    }
    if (currentUser !== comment.userProfileId) {
        return null;
    }

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Input
                                    id="userId"
                                    type="hidden"
                                    defaultValue={userProfileId}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="postId">Edit Comment</Label>
                                <Input type="hidden" id="postId"
                                    value={comment.postId} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="subject">Subject</Label>
                                <Input id="subject"
                                    defaultValue={comment.subject}
                                    onChange={handleFieldChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="content">Content</Label>
                                <Input
                                    className="contentTextArea"
                                    type="textarea"
                                    style={{ height: 200 }}
                                    id="content"
                                    defaultValue={comment.content}
                                    onChange={handleFieldChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                {/* <Label for="createDateTime">CreateDateTime</Label> */}
                                <Input
                                    id="createDateTime"
                                    type="hidden"
                                    defaultValue={comment.createDateTime}
                                />
                            </FormGroup>
                        </Form>
                        {(currentUser === comment.userProfileId) ? <Button color="info" onClick={submit} className="commentButton">
                            Submit
                                </Button> : <div></div>}
                        <Link to={`/posts/${postId}/comments`}>
                            <Button color="secondary" className="commentButton">Back</Button>
                        </Link>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
export default CommentEditForm;