import postService from '../services/posts';

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'INIT_USER':
    return action.data.user;
  case 'LOGIN_USER':
    return action.data.user;
  case 'REMOVE_USER':
    return null;
  default:
    return state;
  }
};

export const loginUser = (user) => ({
  type: 'LOGIN_USER',
  data: {
    user,
  },
});

export const logoutUser = () => {
  window.localStorage.removeItem('loggedInBlogappUser');
  postService.setToken(null);
  console.log('logged out');
  return {
    type: 'REMOVE_USER',
  };
};

export const initializeUser = () => {
  const loggedInUser = window.localStorage.getItem('loggedInBlogappUser');
  let parsedUser;
  if (loggedInUser) {
    parsedUser = JSON.parse(loggedInUser);
    postService.setToken(parsedUser.token);
    console.log('Found logged in user:', parsedUser);
  }
  return {
    type: 'INIT_USER',
    data: {
      user: parsedUser || null,
    },
  };
};

export default userReducer;
