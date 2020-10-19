import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import CommentList from './components/Comment/CommentList';
import { CommentProvider } from './providers/CommentProvider';
import CommentForm from './components/Comment/CommentForm';
import CommentDelete from './components/Comment/CommentDelete';

import { PostProvider } from './providers/PostProvider';
import { CategoryProvider } from "./providers/CategoryProvider";
import { ImageProvider } from './providers/ImageProvider';
import { CategoryProvider } from "./providers/CategoryProvider"
import { SubscriptionProvider } from './providers/SubscriptionProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <ImageProvider>
        <SubscriptionProvider>
          <PostProvider>
            <CategoryProvider>
              <Header />
              <ApplicationViews />
            </CategoryProvider>
          </PostProvider>
        </SubscriptionProvider>
        </ImageProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
