import React, { useContext } from "react";
import { Switch, Route, Redirect, useParams } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import HomePage from "./HomePage";
import { LocalUserProvider } from "../providers/LocalUserProvider";
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
import ConfirmDelete from "./posts/ConfirmDelete";
import EditPost from "./posts/EditPost";
import UserProfileList from "./UserProfile/UserProfileList";
import UserProfileDetails from './UserProfile/UserProfileDetails';
import UserProfileEdit from './UserProfile/UserProfileEdit';
import CommentList from "./Comment/CommentList";
import DemotionRejection from "./UserProfile/DemotionRejection";
import DeactivatedUser from "./DeactivatedUser";
import DeactivatedUserList from "./UserProfile/DeactivatedUserList";


export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);
  const { id } = useParams();


  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ?
            <LocalUserProvider>
              <HomePage />
            </LocalUserProvider>
          : 
          <Redirect to="/login" />}
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

        <Route path="/posts/edit/:postId(\d+)" exact>
          {isLoggedIn ? <EditPost /> : <Redirect to="/login" />}
        </Route>

        {/* <Route path="/posts/delete/:postId(\d+)" exact>
          {isLoggedIn ? <ConfirmDelete /> : <Redirect to="/login" />}
        </Route> */}

        <Route path="/posts/:postId(\d+)" exact>
          {isLoggedIn ? 
            <TagProvider>
              <PostDetail />
            </TagProvider>
           : <Redirect to="/login" />}
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

        {/* Comment Routes */}
        <Route path="/posts/:postId/comments/:commentId/delete">
          {isLoggedIn ? <CommentProvider><CommentDelete /></CommentProvider> : <Redirect to="/login/" />}
        </Route>

        <Route path="/posts/:postId/comments/:commentId(\d+)/edit">
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
        <Route path="/user" exact>
          {isLoggedIn ? <UserProfileList /> : <Redirect to="/login/" />}
        </Route>
        <Route path="/user/:id(\d+)/details" exact>
          {isLoggedIn ? <UserProfileDetails /> : <Redirect to="/login/" />}
        </Route>
        <Route path="/user/:id(\d+)/edit" exact>
          {isLoggedIn ? <UserProfileEdit /> : <Redirect to="/login/" />}
        </Route>
        <Route path="/user/nodelete">
        {isLoggedIn ? <DemotionRejection /> : <Redirect to="/login/" />}
        </Route>
        <Route path="/deactivateduser">
          <DeactivatedUser />
        </Route>
        <Route path="/user/deactivated">
          <DeactivatedUserList />
        </Route>
      </Switch>
    </main >
  );
};
