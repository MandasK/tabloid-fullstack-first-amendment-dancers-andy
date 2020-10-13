import React, { useContext, useEffect, useState, useRef } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useHistory, Link } from "react-router-dom";
import {
    Button, Table
} from "reactstrap";

const UserPostList = () => {
    const { posts, getAllUserPosts } = useContext(PostContext);
    const history = useHistory();



    useEffect(() => {
        getAllUserPosts(JSON.parse(sessionStorage.getItem("userProfile")).id);
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-left">
                <Button color="danger"
                    onClick={() => { history.push(`/postForm/`) }}>
                    add post
                    </Button>
                <Table>

                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Category</th>
                        </tr>
                    </thead>

                    {posts.map((post) => (
                        <tbody key={post.id}>
                            <tr>
                                <Link to={`/posts/${post.id}`}>
                                    <th scope="row">{post.title}</th>
                                </Link>
                                <td>{post.userProfile.firstName} {post.userProfile.lastName}</td>
                                <td>{post.category.name}</td>
                            </tr>
                        </tbody>
                    ))}
                </Table>
            </div>
        </div>
    );
};

export default UserPostList;