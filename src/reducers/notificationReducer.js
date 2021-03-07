const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return {
      type: action.data.type,
      message: action.data.message,
    };
  case 'REMOVE_NOTIFICATION':
    return null;
  default:
    return state;
  }
};

let timeOutId;

export const flashNotification = (type, message, time = 5) => async (dispatch) => {
  if (timeOutId) {
    console.log('id found');
    clearTimeout(timeOutId);
  }
  dispatch({
    type: 'SET_NOTIFICATION',
    data: {
      type,
      message,
    },
  });
  console.log('dispatched');
  timeOutId = setTimeout(() => {
    dispatch({
      type: 'REMOVE_NOTIFICATION',
    });
    console.log('removed');
  }, time * 1000);
};

export default notificationReducer;
