import userService from '../services/users';

const usersReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.data;
  default:
    return state;
  }
};

export const initializeUsers = () => async (dispatch) => {
  try {
    const users = await userService.getAll();
    dispatch({
      type: 'INIT_USERS',
      data: users,
    });
  } catch (error) {
    console.log('error fetching all users:', error);
  }
};

export default usersReducer;
