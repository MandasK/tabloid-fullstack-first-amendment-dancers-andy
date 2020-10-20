import React, { useContext, useEffect, useState, useRef } from "react";
import {Helmet} from "react-helmet";
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
            <Helmet>
                <title>Tabloid-{JSON.parse(sessionStorage.getItem("userProfile")).firstName} {JSON.parse(sessionStorage.getItem("userProfile")).lastName}- Posts</title>
                <meta name="description" content="Tabloid login page" />
            </Helmet>
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
                                <th scope="row">
                                    <Link to={`/posts/${post.id}`}>
                                        {post.title}
                                    </Link>
                                </th>
                                <td>
                                        {post.userProfile.firstName} {post.userProfile.lastName}
                                </td>
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