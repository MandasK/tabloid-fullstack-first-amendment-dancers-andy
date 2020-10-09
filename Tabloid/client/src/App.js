import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
<<<<<<< HEAD
import { PostProvider } from './providers/PostProvider';
=======
import { CategoryProvider } from "./providers/CategoryProvider"
>>>>>>> master

function App() {
  return (
    <Router>
      <UserProfileProvider>
<<<<<<< HEAD
        <PostProvider>
          <Header />
          <ApplicationViews />
        </PostProvider>
=======
        <CategoryProvider>
          <Header />
          <ApplicationViews />
        </CategoryProvider>
>>>>>>> master
      </UserProfileProvider>
    </Router>
  );
}

export default App;
