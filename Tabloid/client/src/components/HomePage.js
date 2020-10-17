import React, { useContext, useEffect, useState } from 'react';
import { LocalUserContext } from "../providers/LocalUserProvider";
import { PostContext } from "../providers/PostProvider";
import { useHistory, Link } from "react-router-dom";
import "./HomePage.css"
import logo_transparent from '../components/Images/logo_transparent.png';
import PostCardForHomePage from "./posts/PostCardForHomePage";

const HomePage = () => {

    //remove broken link on bad image
    const [goodImage, setGoodImage] = useState(true)

    const badImage = () => {
        setGoodImage(false)
    }

    //

    const {
        userId,
        userFirstName,
        userImageLoc
    } = useContext(LocalUserContext);

    const {
        posts,
        get3RandomPosts
    } = useContext(PostContext);

    useEffect(() =>{
        get3RandomPosts(3, userId)
    }, [])
//Add default image if the link comes back broken. 
// Unfortunately this is treating the route as a URL instead of a local source so I'll need some help first

    const addDefaultSrc = (ev) => {
        // ev.target.src = "./Images/Newspaper.png"
      }

    let welcome = "Good Morning, "
    let time = new Date().toLocaleString().split(" ")
        time[1] = time[1].split(":");
    let hour = parseInt(time[1][0])
        if(hour < 6 && time[2] === "PM") {
            welcome = "Good Afternoon, "
        }
        else if (hour < 12 && hour > 6 && time[2] === "PM"){
            welcome = "Good Evening, "
        }

    //index supplies a unique number to add to the 3 post class names
    //That's what I'm using to slide the 3 posts into view at different rates
    let index = 1

    return (
        <div className="homePage">
            <div className="logo_Side">
                <img src={logo_transparent} alt="Tabloid logo" className="LogoImage" />
                <img src={userImageLoc} alt="Tabloid logo" className="user_Image_Welcome" />
                <p className="welcome">{welcome}{userFirstName}</p>
            </div>
            <div className="post_Side">
                <h3 className="recommended_Banner">Here are some posts we recommend for you</h3>
                <div className="homepage_Post_Container" >
                    {posts.map((post) =>
                        <PostCardForHomePage 
                                key={post.id}
                                post={post}
                                index={index++}
                                goodImage={goodImage}
                                badImage={badImage}
                                /> )}
                </div>
            </div>
        </div>
    )
}

export default HomePage