/* eslint-disable import/no-named-as-default-member */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Switch, Route, useRouteMatch, Redirect,
} from 'react-router-dom';
import { initializeUser } from './reducers/userReducer';
import { initializeUsers } from './reducers/usersReducer';
import { initializePosts } from './reducers/postsReducer';
import './App.css';
import Navbar from './components/Navbar';
import Content from './components/Content';
import UserList from './components/UserList';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Notification from './components/Notification';
import UserDetail from './components/UserDetail';
import PostView from './components/PostView';

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUsers);
  const userMatch = useRouteMatch('/users/:username');
  const postMatch = useRouteMatch('/blog/:postUrl');
  const userDetail = userMatch
    ? users.find((user) => user.username === userMatch.params.username)
    : null;

  // Get the logged in user if any
  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  // On page load fetching all posts from the database
  useEffect(() => {
    dispatch(initializePosts());
  }, []);

  // And fetching all users from the database
  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="px-4">
        <Notification />
        <Switch>
          <Route path="/blog/:url">
            {console.log('postMatch:', postMatch)}
            {
              postMatch
                ? <PostView url={postMatch.params.postUrl} />
                : null
            }
          </Route>
          <Route path="/blog">
            <Content />
          </Route>
          <Route path="/users/:username">
            <UserDetail user={userDetail} />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/login">
            <div className="grid md:grid-cols-2 md:gap-5 md:px-12">
              <LoginForm />
              <RegisterForm />
            </div>
          </Route>
          <Route path="/">
            <Redirect to="/blog" />
          </Route>
          <Route path="*">
            <h2 className="font-semibold text-2xl">
              Page not found.
            </h2>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
