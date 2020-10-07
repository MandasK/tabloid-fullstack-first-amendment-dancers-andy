import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import CategoryList from "./Category/CategoryList";
import CategoryForm from "./Category/CategoryForm";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
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
      </Switch>
    </main>
  );
};
