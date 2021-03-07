import crypto from 'crypto';
import postService from '../services/posts';

const singlePostReducer = (state = {}, action) => {
  switch (action.type) {
  case 'SET_POST_VIEW':
    return action.data;
  case 'UPDATE_POST':
    console.log('setting new state individual post');
    return action.data.savedPost;
  default:
    return state;
  }
};

export const setSinglePostView = (url) => async (dispatch) => {
  const post = await postService.getByUrl(url);
  dispatch({
    type: 'SET_POST_VIEW',
    data: post,
  });
};

export const commentPost = (post, comment) => async (dispatch) => {
  const id = crypto.randomBytes(12).toString('hex');
  const commentWithId = { ...comment, id };
  const savedPost = await postService
    .updateOne(post.id, { ...post, comments: [commentWithId, ...post.comments] });
  console.log(savedPost);
  dispatch({
    type: 'UPDATE_POST',
    data: {
      savedPost,
    },
  });
};

export const deleteComment = (post, comment) => async (dispatch) => {
  const newComments = post.comments.filter((com) => com !== comment);
  const savedPost = await postService
    .updateOne(post.id, { ...post, comments: newComments });
  dispatch({
    type: 'UPDATE_POST',
    data: {
      savedPost,
    },
  });
};

export default singlePostReducer;
