import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../reducers/userReducer';
import StyleButton from './StyleButton';
import postService from '../services/posts';
import loginService from '../services/login';
import { flashNotification } from '../reducers/notificationReducer';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const formClass = 'focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md shadow-sm sm:text-sm border-gray-300 md:max-w-md';
  // Sending the request to login endpoint and setting hook, localstorage and token
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const fetchedUser = await loginService.login({ username, password });
      postService.setToken(fetchedUser.token);
      window.localStorage.setItem('loggedInBlogappUser', JSON.stringify(fetchedUser));
      console.log('Logged in as:', fetchedUser);
      dispatch(loginUser(fetchedUser));
      return history.push('/blog');
    } catch (error) {
      console.log();
      let { errors } = error.response.data;
      if (errors) {
        errors = errors.map((err) => err.msg).join(', ');
      }
      const err = error.response.data.error;
      const errorsToMsg = errors || err;
      return dispatch(flashNotification('error', errorsToMsg));
    }
  };
  return (
    <div>
      <h2 className="font-bold text-2xl my-3">
        Login now
      </h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="loginUsername">
            Username
            <input
              type="text"
              id="loginUsername"
              value={username}
              name="username"
              className={formClass}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="loginPassword">
            Password
            <input
              id="loginPassword"
              type="password"
              value={password}
              name="password"
              className={formClass}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <StyleButton type="submit" text="Login" id="loginButton" />
      </form>
    </div>
  );
};

export default LoginForm;
