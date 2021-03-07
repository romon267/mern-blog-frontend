import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from '../services/login';
import { flashNotification } from '../reducers/notificationReducer';
import StyleButton from './StyleButton';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const dispatch = useDispatch();
  const formClass = 'focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md shadow-sm sm:text-sm border-gray-300 md:max-w-md';

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await authService.register({
        name, username, email, password1, password2,
      });
      console.log(response);
      return dispatch(flashNotification('success', 'Registered successfully!', 5));
    } catch (error) {
      console.log(error.response.data);
      const errors = error.response.data.errors.map((err) => err.msg).join(', ');
      return dispatch(flashNotification('error', errors, 15));
    }
  };
  return (
    <div>
      <h2 className="font-bold text-2xl my-3">
        Or register
      </h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="regName">
            Name
            <input
              type="text"
              value={name}
              name="name"
              id="regName"
              className={formClass}
              onChange={({ target }) => setName(target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="regUsername">
            Username
            <input
              type="text"
              value={username}
              name="username"
              id="regUsername"
              className={formClass}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="regEmail">
            Email
            <input
              type="text"
              value={email}
              name="email"
              id="regEmail"
              className={formClass}
              onChange={({ target }) => setEmail(target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="regPassword1">
            Password
            <input
              type="password"
              value={password1}
              name="password1"
              id="regPassword1"
              className={formClass}
              onChange={({ target }) => setPassword1(target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="regPassword2">
            Confirm password
            <input
              type="password"
              value={password2}
              name="password2"
              id="regPassword2"
              className={formClass}
              onChange={({ target }) => setPassword2(target.value)}
            />
          </label>
        </div>
        <StyleButton text="Sign Up" type="submit" id="signUpButton" />
      </form>
    </div>
  );
};

export default RegisterForm;
