import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
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
import { useParams } from "react-router-dom";
import ConfirmDelete from "./posts/ConfirmDelete";

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

        {/* <Route path="/posts/delete/:postId(\d+)" exact>
          {isLoggedIn ? <ConfirmDelete /> : <Redirect to="/login" />}
        </Route> */}

        <Route path="/posts/:postId(\d+)" exact>
          {isLoggedIn ? <PostDetail /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts/delete/:postId(\d+)" exact>
          {isLoggedIn ? <ConfirmDelete /> : <Redirect to="/login" />}
        </Route>



        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
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
    </main >
  );
};
