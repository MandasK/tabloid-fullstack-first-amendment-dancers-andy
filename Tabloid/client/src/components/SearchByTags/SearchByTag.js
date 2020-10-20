import React, { useContext, useState, useEffect }from 'react';
import { TagContext } from "../../providers/TagProvider";
import { PostContext } from "../../providers/PostProvider";
import { useHistory, Link } from "react-router-dom";
import PostCardForHomePage from "../posts/PostCardForHomePage";
import logo_transparent from '../Images/logo_transparent.png';
import Tag from "../Tag/Tag"; 
import "./SearchByTags.css"

const SearchByTag = () => { 

    const [tagName, setTagName] = useState();
    const {
        tagSearchId,
        setTagSearchId,
        tags,
        GetAllTags,
        tagsLoaded,
        setTagsLoaded
    } = useContext(TagContext);

    const {
        tagSearchResultPosts,
        getPostsByTagId,
        setTagSearchResultPosts
    } = useContext(PostContext);

    

    const tagButtonClick = (tagId) => {
        setTagSearchId(tagId)
        let selectedTag = tags.find((tag) => tag.id === tagId )
        setTagName(selectedTag.name)
    }

    useEffect(() => {
        setTagSearchResultPosts([])
        GetAllTags()
        setTagsLoaded(tagsLoaded)       
    }, [])

    useEffect(() => {
        if (tagSearchId != undefined){
            getPostsByTagId(tagSearchId)
            if (tags.length !== 0) {
                let selectedTag = tags.find((tag) => tag.id === tagSearchId )
                setTagName(selectedTag.name)
            }
        }
    }, [tagsLoaded])

    useEffect(() => {
        if (tagSearchId !== undefined){
            getPostsByTagId(tagSearchId)
        }
    }, [tagSearchId])


    let index = 1
    return (
        <div className="homePage">
            <div className="logo_Side">
                <img src={logo_transparent} alt="Tabloid logo" className="LogoImage" />
                <h4 className="welcome">Click to Search by Tag</h4>
                <div className="tags_For_Searchpage" >
                    {tags.map((tag) =>                    
                        <Tag 
                            key={tag.id}
                            tag={tag} 
                            tagButtonClick={tagButtonClick} 
                            /> )}
                </div>
            </div>
            <div className="post_Side">
                {tagName !== undefined &&
                <h3 className="recommended_Banner">Here are the results for {tagName}</h3>}
                <div className="homepage_Post_Container" >
                    { tagSearchResultPosts.map((post) =>                    
                        <PostCardForHomePage 
                                key={post.id}
                                post={post}
                                index={index++}
                                /> )}
                </div>
            </div>
        </div>
    );
};

export default SearchByTag