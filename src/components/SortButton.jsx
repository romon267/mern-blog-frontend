import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sortPosts } from '../reducers/postsReducer';

const SortButton = () => {
  const [sorted, setSorted] = useState(false);
  const dispatch = useDispatch();
  const buttonStyle = 'mt-4 my-3 py-2 px-4 shadow text-sm font-medium rounded-md text-white bg-gradient-to-r from-yellow-400 hover:from-pink-500 to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500';

  const handleSortByLikes = () => {
    dispatch(sortPosts('likes'));
    return setSorted(true);
  };

  const handleSortByDate = async () => {
    dispatch(sortPosts('date'));
    return setSorted(false);
  };

  return (
    <div>
      {sorted
        ? (
          <button
            type="button"
            onClick={handleSortByDate}
            className={buttonStyle}
          >
            sort by date
          </button>
        )
        : (
          <button
            type="button"
            onClick={handleSortByLikes}
            className={buttonStyle}
          >
            sort by likes
          </button>
        )}
    </div>
  );
};

export default SortButton;
