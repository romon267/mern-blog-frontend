import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deletePost, likePost } from '../reducers/postsReducer';

const PostPreview = ({ post }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.activeUser);
  const history = useHistory();
  const handleDelete = () => {
    dispatch(deletePost(post.id));
    return history.push('/blog');
  };
  if (!post) {
    return null;
  }
  return (
    <>
      <p className="text-justify px-5 py-2">{post.content.length > 160 ? post.content.slice(0, 160).concat('...') : post.content}</p>
      <p className="text-justify pl-5">
        likes:
        {' '}
        <strong>{post.likes}</strong>
        {' '}
        author:
        {' '}
        <strong>{post.author ? post.author.username : 'deleted'}</strong>
        {' '}
      </p>
      {user
        ? (
          <div className="flex px-3 justify-between">
            <button
              id="likeButton"
              type="button"
              onClick={() => dispatch(likePost(post))}
              className="py-1 px-3 mx-2 mt-2 shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-pink-400 hover:from-pink-600 to-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Like
            </button>
            {user.username === post.author.username ? (
              <button
                type="button"
                onClick={handleDelete}
                className="py-1 px-3 mx-2 mt-2 shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-orange-400 hover:from-orange-600 to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Delete
              </button>
            ) : (
              ''
            )}
          </div>
        ) : ''}

    </>
  );
};

PostPreview.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    likes: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string,
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PostPreview;
