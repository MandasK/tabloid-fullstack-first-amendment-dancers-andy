import React, { useContext } from "react";
import { Switch, Route, Redirect, useParams } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import CommentEditForm from "./Comment/CommentEditForm";
import CommentDelete from "./Comment/CommentDelete";
import CommentForm from "./Comment/CommentForm";
import { CommentProvider } from "../providers/CommentProvider";

import PostList from "./posts/PostList";
import UserPostList from "./posts/UserPostList";
import PostDetail from "./posts/PostDetaill";
import PostForm from "./posts/PostForm";
import TagList from "./Tag/TagList"
import { TagProvider } from "../providers/TagProvider";
import CategoryList from "./Category/CategoryList";
import CategoryForm from "./Category/CategoryForm";
import CategoryDelete from "./Category/CategoryDelete";
import CategoryEdit from "./Category/CategoryEdit";
import CommentList from "./Comment/CommentList";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);
  const { id } = useParams();


  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>
        <Route path="/tagmanagement">

          {isLoggedIn ?
            <TagProvider>
              <TagList />
            </TagProvider>
            : <Redirect to="/login" />}
        </Route>

        <Route path="/posts" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/my_posts" exact>
          {isLoggedIn ? <UserPostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/postForm" exact>
          {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts/:postId(\d+)" exact>
          {isLoggedIn ? <PostDetail /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        {/* Comment Routes */}
        <Route path="/posts/:postId/comments/:commentId/delete">
          {isLoggedIn ? <CommentProvider><CommentDelete /></CommentProvider> : <Redirect to="/login/" />}
        </Route>

        <Route path="/posts/:postId/comments/:commentId/edit">
          {isLoggedIn ? <CommentProvider><CommentEditForm /></CommentProvider> : <Redirect to="/login/" />}
        </Route>

        <Route path="/comment/:id/edit">
          {isLoggedIn ? <CommentProvider><CommentEditForm /> </CommentProvider> : <Redirect to="/login/" />}
        </Route>

        <Route path="/posts/:postId/comments" exact>
          {isLoggedIn ? <CommentProvider> <CommentList /> </CommentProvider> : <Redirect to="/login/" />}
        </Route>

        <Route path="/posts/:postId/comments/new">
          {isLoggedIn ? <CommentProvider> <CommentForm /> </CommentProvider> : <Redirect to="/login/" />}
        </Route>
        {/* End of Comment Routes */}

        <Route path="/category" exact>
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login/" />}
        </Route>
        <Route path="/category/add">
          {isLoggedIn ? <CategoryForm /> : <Redirect to="/login/" />}
        </Route>
        <Route path="/category/:id/delete">
          {isLoggedIn ? <CategoryDelete /> : <Redirect to="/login/" />}
        </Route>
        <Route path="/category/:id/edit">
          {isLoggedIn ? <CategoryEdit /> : <Redirect to="/login/" />}
        </Route>
      </Switch>
    </main>
  );
};
