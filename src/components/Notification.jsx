import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  // Rendering notification only when there are any
  if (notification) {
    return (
      <div className={notification.type === 'success'
        ? 'bg-green-500 p-5 font-semibold rounded shadow m-3 text-white'
        : 'bg-red-400 p-5 font-semibold rounded shadow m-3 text-white'}
      >
        {notification.message}
      </div>
    );
  }
  return null;
};

export default Notification;
