import React, { useContext, useEffect, useState, useRef } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useHistory, Link } from "react-router-dom";
import {
    Button, Table
} from "reactstrap";

const PostList = () => {
    const { posts, getAllPosts } = useContext(PostContext);
    const history = useHistory();

    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
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
                                    <td>{post.title}</td>
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

export default PostList;