import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PostDetails from './PostDetails';
import PostPreview from './PostPreview';

const Post = ({ post, compact }) => {
  const [full, setFull] = useState(false);
  const [label, setLabel] = useState('view');
  if (!post) {
    return null;
  }

  // Opening and closing post preview
  const handleFull = () => {
    setFull(!full);
    if (label === 'view') {
      setLabel('hide');
    } else {
      setLabel('view');
    }
  };

  return (
    <div className="py-3 px-2 mx-2 my-2 border shadow rounded hover:bg-gray-100">
      {compact ? (
        <>
          <h3>
            <Link to={`/blog/${post.url}`} className="font-bold text-xl px-5 text-gray-500 hover:text-gray-700">
              {post.title}
            </Link>
            {
              post.content.length > 160
                ? (
                  <button className="ml-3 px-2 focus:outline-none shadow-sm rounded-sm bg-gray-100 hover:bg-gray-500 hover:text-white" type="button" onClick={handleFull}>
                    {label}
                  </button>
                ) : null
            }
          </h3>
          {full ? <PostDetails post={post} /> : <PostPreview post={post} />}
        </>
      ) : (
        <>
          <Link to={`/blog/${post.url}`} className="font-bold text-xl px-5 text-gray-500 hover:text-gray-700">{post.title}</Link>
          <PostDetails post={post} />
        </>
      )}
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
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
  compact: PropTypes.bool.isRequired,
};

export default Post;
