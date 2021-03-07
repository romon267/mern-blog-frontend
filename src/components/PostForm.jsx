import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { flashNotification } from '../reducers/notificationReducer';
import { createPost } from '../reducers/postsReducer';
import StyleButton from './StyleButton';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  // Creating a new post
  const handlePostCreation = (event) => {
    event.preventDefault();
    try {
      dispatch(createPost({ title, content }));
      setTitle('');
      return setContent('');
    } catch (error) {
      return dispatch(flashNotification('error', error.response.data.error, 5));
    }
  };

  return (
    <form onSubmit={handlePostCreation}>
      <div>
        <label htmlFor="title">
          <span className="block text-m font-medium">Title</span>
          <input
            id="title"
            type="text"
            value={title}
            name="title"
            placeholder="Title"
            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md shadow-sm sm:text-sm border-gray-300"
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="content">
          <span className="block text-m font-medium">Content</span>
          <textarea
            id="content"
            type="text"
            value={content}
            name="content"
            cols="30"
            rows="10"
            placeholder="Write here what you want to say..."
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
            onChange={({ target }) => setContent(target.value)}
          />
        </label>
      </div>
      <StyleButton
        id="postSubmit"
        type="submit"
        text="Create"
      />
    </form>
  );
};

export default PostForm;
