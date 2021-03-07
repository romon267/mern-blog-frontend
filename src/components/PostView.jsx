import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setSinglePostView, commentPost, deleteComment } from '../reducers/singlePostReducer';
import PostDetails from './PostDetails';
import StyleButton from './StyleButton';

const PostView = ({ url }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const post = useSelector((state) => state.postDetailView);
  const user = useSelector((state) => state.activeUser);
  const formClass = 'focus:ring-indigo-500 col-span-3 col-start-2 focus:border-indigo-500 flex-1 block w-full rounded-md shadow-sm sm:text-sm border-gray-300';

  const handleCreateComment = (event) => {
    event.preventDefault();
    dispatch(commentPost(post, { author: user.username, content: comment }));
    setComment('');
  };
  useEffect(() => {
    dispatch(setSinglePostView(url));
  }, [url]);

  if (!post || post.url !== url) {
    return <h4>Loading...</h4>;
  }
  return (
    <div className="md:grid grid-cols-5">
      <div className="col-start-2 col-span-3 border rounded shadow-sm text-center mt-5">
        <h2 className="text-3xl mt-3 md:text-4xl font-bold">{post.title}</h2>
        <PostDetails post={post} />
        <form onSubmit={handleCreateComment}>
          <label htmlFor="comment">
            <span className="font-semibold">Add a comment:</span>
            <div className="grid grid-cols-5">
              <textarea
                value={comment}
                onChange={({ target }) => setComment(target.value)}
                type="text"
                id="comment"
                name="comment"
                className={formClass}
              />
            </div>
          </label>
          <StyleButton type="submit" text="Post" id="commentSubmit" />
        </form>
        <h4 className="text-left ml-5 font-semibold">
          Comments(
          {post.comments.length}
          ):
        </h4>
        <ul className="text-left ml-5 pb-3">
          {post.comments.map((com) => (
            <div key={com.id}>
              <li>{com.content}</li>
              <ul>
                <li>
                  by
                  {' '}
                  <strong>{com.author}</strong>
                  {user.username === com.author
                    ? (
                      <button
                        type="button"
                        onClick={() => dispatch(deleteComment(post, com))}
                        className="py-1 px-3 mx-2 mt-2 shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-orange-400 hover:from-orange-600 to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      >
                        Delete
                      </button>
                    )
                    : null }
                </li>
              </ul>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

PostView.propTypes = {
  url: PropTypes.string.isRequired,
};

export default PostView;
