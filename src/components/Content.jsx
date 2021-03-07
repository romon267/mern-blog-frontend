import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Post from './Post';
import PostForm from './PostForm';
import SortButton from './SortButton';

const Content = () => {
  const [compact, setCompact] = useState(true);
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.activeUser);
  const buttonStyle = 'mt-4 my-3 py-2 px-4 shadow text-sm font-medium rounded-md text-white bg-gradient-to-r from-yellow-400 hover:from-pink-500 to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500';
  if (!posts) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  // Handling the compact view button
  const handleCompact = () => {
    setCompact(!compact);
  };

  return (
    <div className="text-gray-700 grid md:grid-cols-2 md:gap-5 md:px-8 mt-5">
      <div className="md:col-span-1 md:col-start-1">
        <h1 className="font-bold text-3xl antialiased">Blog</h1>
        {/* if user is logged in, shows Form,
        otherwise - suggests to login */}
        {user
          ? (
            <>
              <h2>Create new post</h2>
              <PostForm
                posts={posts}
              />
            </>
          )
          : 'Login to create new posts!' }
      </div>
      <div className="md:col-span-1 md:col-start-2">
        <div className="flex justify-end space-x-4 mr-2">
          {/* Button for switching compact view */}
          {compact ? (
            <button
              type="button"
              onClick={handleCompact}
              className={buttonStyle}
            >
              Full view
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCompact}
              className={buttonStyle}
            >
              Compact
            </button>
          )}
          {/* Sorting the posts by likes or date */}
          <SortButton />
        </div>
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            compact={compact}
          />
        ))}
      </div>

    </div>
  );
};

export default Content;
