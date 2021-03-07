import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Post from './Post';
// import postService from '../services/posts';

const UserDetail = ({ user }) => {
  console.log('rendering component');
  const posts = useSelector((state) => state.posts
    .filter((post) => post.author.username === user.username));
  if (!user) {
    return null;
  }
  // let posts;
  // useEffect(() => {
  //   postService.getByUsername(user.username)
  //     .then((fPosts) => {
  //       posts = fPosts;
  //     });
  // });
  return (
    <div>
      <h2 className="font-bold px-3 text-2xl my-2">
        {user.username}
      </h2>
      <h3>
        <span className="font-semibold px-3 text-xl">List of all posts:</span>
        {posts.map((post) => <Post key={post.id} post={post} compact={false} />)}
      </h3>
    </div>
  );
};

UserDetail.defaultProps = {
  user: {} || null,
};

UserDetail.propTypes = {
  user: PropTypes.shape({
    posts: PropTypes.arrayOf(PropTypes.object),
    username: PropTypes.string,
  }),
};

export default UserDetail;
