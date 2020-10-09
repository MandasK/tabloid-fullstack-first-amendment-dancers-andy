import React, { useContext } from "react";
import { Switch, Route, Redirect, useParams } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import CommentEditForm from "./Comment/CommentEditForm";
import CommentDelete from "./Comment/CommentDelete";
import CommentForm from "./Comment/CommentForm";
import {CommentProvider} from "../providers/CommentProvider";

import TagList from "./Tag/TagList"
import { TagProvider } from "../providers/TagProvider";
import CategoryList from "./Category/CategoryList";
import CategoryForm from "./Category/CategoryForm";
import CategoryDelete from "./Category/CategoryDelete";
import CategoryEdit from "./Category/CategoryEdit";

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

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        {/* Comment Routes */}
        <Route path="/comment/:id/delete">
          {isLoggedIn ? <CommentProvider><CommentDelete /></CommentProvider> : <Redirect to="/login/" />}
        </Route>

        <Route path="/comment/:id/edit">
          {isLoggedIn ? <CommentProvider><CommentEditForm /> </CommentProvider>: <Redirect to="/login/" />}
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
    </main>
  );
};
