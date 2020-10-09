import React, { useContext, useState } from "react";
import { Button, Form, FormGroup, Label, Input, Card, CardBody } from "reactstrap";
import { useHistory } from "react-router-dom"
import { CommentContext } from "../../providers/CommentProvider";

const CommentEditForm = () => {

    const { addComment } = useContext(CommentContext);
    const [userProfileId, setUserProfileId] = useState("");
    const [postId, setPostId] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [createDateTime, setCreateDateTime] = useState("");
    const history = useHistory();

    const submit = (evt) => {
        const comment = {
            userProfileId,
            postId,
            subject,
            content,
            createDateTime
        };
        const user = JSON.parse(sessionStorage.getItem("userProfile")).id
        comment.userProfileId = user
        
        comment.createDateTime = new Date()

        addComment(comment).then((evt) => {
            history.push("/");
        });
    };

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            {/* <FormGroup>
                                <Label for="userId">User Id (For Now...)</Label>
                                <Input
                                    id="userId"
                                    onChange={(e) => setUserProfileId(e.target.value)}
                                />
                            </FormGroup> */}
                            <FormGroup>
                                <Label for="postId">Post Id</Label>
                                <Input
                                    id="postId"
                                    onChange={(e) => setPostId(parseInt(e.target.value))}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="subject">Subject</Label>
                                <Input id="subject" onChange={(e) => setSubject(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="content">Content</Label>
                                <Input
                                    id="content"
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="createDateTime">CreateDateTime</Label>
                                <Input
                                    id="createDateTime"
                                    type="date"
                                    onChange={(e) => setCreateDateTime(e.target.value)}
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
    )
}
export default CommentEditForm;