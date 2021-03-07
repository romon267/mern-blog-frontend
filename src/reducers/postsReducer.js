/* eslint-disable no-case-declarations */
import postService from '../services/posts';
import { flashNotification } from './notificationReducer';

const postsReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_POST':
    return [action.data, ...state];
  case 'DELETE_POST':
    return state.filter((post) => post.id !== action.data.id);
  case 'SORT_POSTS':
    const sortedPosts = [...state];
    if (action.method === 'likes') {
      sortedPosts.sort((a, b) => b.likes - a.likes);
    } else if (action.method === 'date') {
      sortedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return sortedPosts;
  case 'UPDATE_POST':
    console.log('setting new state global');
    const { savedPost } = action.data;
    const newState = state.map((p) => (p.id === savedPost.id ? savedPost : p));
    return newState;
  case 'INIT_POSTS':
    return action.data;
  default:
    return state;
  }
};

export const sortPosts = (method) => ({
  type: 'SORT_POSTS',
  method,
});

export const likePost = (post) => async (dispatch) => {
  const savedPost = await postService.updateOne(post.id, { ...post, likes: post.likes + 1 });
  console.log(savedPost);
  dispatch({
    type: 'UPDATE_POST',
    data: {
      savedPost,
    },
  });
};

export const createPost = (data) => async (dispatch) => {
  try {
    const savedPost = await postService.create(data);
    dispatch(flashNotification('success', `Post "${savedPost.title}" successfully created!`, 5));
    return dispatch({
      type: 'ADD_POST',
      data: savedPost,
    });
  } catch (error) {
    console.log('error creating a post:', error.response.data);
    return dispatch(flashNotification('error', 'Error creating a new post!'));
  }
};

export const deletePost = (id) => async (dispatch) => {
  await postService.deleteOne(id);
  dispatch({
    type: 'DELETE_POST',
    data: {
      id,
    },
  });
};

export const initializePosts = () => async (dispatch) => {
  const initialPosts = await postService.getAll();
  dispatch({
    type: 'INIT_POSTS',
    data: initialPosts,
  });
};

export default postsReducer;
