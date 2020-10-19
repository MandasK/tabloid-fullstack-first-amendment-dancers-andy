import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem, Card, CardImg, CardBody, Button, CardTitle, CardSubtitle, Container } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { TagContext } from "../../providers/TagProvider";
import PostTag from "./PostTag"
import TagsForPost from "./TagsForPost"
import { ImageContext } from '../../providers/ImageProvider';
import { useParams, useHistory, Link } from "react-router-dom";
import { SubscriptionContext } from "../../providers/SubscriptionProvider";
import "./Post.css"


const PostDetail = () => {
    const [post, setPost] = useState();
    const { getSinglePost } = useContext(PostContext);
    const {getImageUrl} = useContext(ImageContext)
    const { addSubscription, getReleventSubscriptions, subscriptions, Unsubscribe } = useContext(SubscriptionContext);
    const { postId } = useParams();
    const history = useHistory();
    const [showTags, setShowTags] = useState(false)
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthor, setIsAuthor] = useState(false)
    const [currentSubscription, setCurrentSubscription] = useState()


    
    
    const {
        postTags,
        GetPostTags
        } = useContext(TagContext)

    useEffect(() => {
        getSinglePost(postId).then(setPost);
        GetPostTags(postId);
        //refresh page when subscription status changes
    }, [isSubscribed]);

    useEffect(() => {
        //ensure there post is not undefined before getting subscriptions
        post && getReleventSubscriptions(JSON.parse(sessionStorage.getItem("userProfile")).id, post.userProfileId)
    }, [post]);

    useEffect(() => {
        //ensure post is not undefined
        if (post) {
            //determine if current use is post author
        if (JSON.parse(sessionStorage.getItem("userProfile")).id == post.userProfileId)
        {
            setIsAuthor(true)
        }
        //map through subscriptions to determine whether the current user is currently subscribed to current post's author
        subscriptions.map((subscription) => {
            if (subscription.endDateTime == null) {
                setIsSubscribed(true)
                setCurrentSubscription(subscription)
            } else if (subscription.endDateTime !== null) {
                setIsSubscribed(false)
                setCurrentSubscription(subscription)
            }
        } )
        
    }
    //ensure subscription list populates
    }, [subscriptions, isSubscribed]);

    if (!post) {
        return null;
    }

    const imageUrl = getImageUrl(post.imageLocation);
    
    const subscribe = () => {
        
        setIsLoading(true)
        const subscription = {
            SubscriberUserProfileId: JSON.parse(sessionStorage.getItem("userProfile")).id,
            ProviderUserProfileId: post.userProfileId
        }
        addSubscription(subscription).then(setCurrentSubscription, setIsSubscribed(true), setIsLoading(false))
    }

    //convert publication date to MM / DD / YYYY

    const publishDate = new Date(post.publishDateTime)
    const HumanPublishDate = `${publishDate.getMonth() + 1}/${publishDate.getDate()}/${publishDate.getFullYear()}`


    return (
        <div className="postDetailsCardContainer">
        <Card className="m-auto">
            <CardBody>
            <div className="post_Detail_Top_With_Tags">
                <div>
                    <h2>{post.title}</h2>
                    <CardSubtitle>By {post.userProfile.displayName}</CardSubtitle>
                </div>
                <div className="Post_Tag_Sizer">
                    <h6 className="Tags_h6">Tags</h6>
                        {postTags.map((tag) => (
                            <PostTag 
                            key={tag.id} 
                            tag={tag}  
                            />
                            ))}
                </div>
            </div>
        </CardBody>
            { post.imageLocation === "" || post.imageLocation === null ?
            <CardImg top />
            :
            <CardImg top src= { post.imageLocation[0] === "h" ? post.imageLocation : imageUrl }  alt={post.title} />
            }
            <CardBody>
                <p style={{ whiteSpace : "pre-wrap" }}>{post.content}</p>
                <p>{HumanPublishDate}</p>
                <Button type="button"
                        style={{margin: 10}}
                    onClick={() => {history.goBack()}}>
                    Back
                </Button>
                <Link to={`/posts/${post.id}/comments`}><Button className="postCommentButton" style={{margin: 10}}
                >Comments</Button></Link>

                <Button type="button"
                        style={{margin: 10}}
                    onClick={() => { history.push(`/posts/`) }}>
                    Post List
                </Button>

               { !isAuthor && ( !isSubscribed ? <Button color="info" disabled={isLoading, isSubscribed} onClick={(e) => {
                e.preventDefault()
                subscribe()
            }
                }>
                            Subscribe to Author
                </Button> : <Button color="info" disabled={isLoading, !isSubscribed} onClick={(e) => {
                e.preventDefault()
                setIsLoading(true)
                Unsubscribe(currentSubscription.id).then(setIsSubscribed(false), setIsLoading(false))
            }
                }>
                            UnSubscribe from Author
                </Button> )
                }


                
                {JSON.parse(sessionStorage.getItem("userProfile")).id === post.userProfileId && <Button color="danger"
                style={{margin: 10}}
                
                onClick={() => { history.push(`/posts/delete/${postId}`) }}>
                        Delete
                         
                </Button >}
                {JSON.parse(sessionStorage.getItem("userProfile")).id === post.userProfileId && <Button color="info"
                style={{margin: 10}}
                
                onClick={() => { history.push(`/posts/edit/${postId}`) }}>
                        Edit
                         
                </Button >}
                {JSON.parse(sessionStorage.getItem("userProfile")).id === post.userProfileId && 
                <Button className="Post_Tag_Button" color="secondary" hidden={showTags} onClick={() => setShowTags(true)}>Manage Tags</Button>
                    }
                    {showTags &&                   
                        <TagsForPost
                            setShowTags={setShowTags}
                            postId={post.id}
                            postTags={postTags}
                            GetPostTags={GetPostTags} />                    
                    }
            </CardBody >
        </Card >
        </div>
    );
};


export default PostDetail;

