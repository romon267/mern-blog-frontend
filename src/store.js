import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import notificationReducer from './reducers/notificationReducer';
import postsReducer from './reducers/postsReducer';
import userReducer from './reducers/userReducer';
import usersReducer from './reducers/usersReducer';
import singlePostReducer from './reducers/singlePostReducer';
import mobileReducer from './reducers/mobileReducer';

const reducer = combineReducers({
  notification: notificationReducer,
  posts: postsReducer,
  activeUser: userReducer,
  allUsers: usersReducer,
  postDetailView: singlePostReducer,
  mobileNavOpened: mobileReducer,
});

const store = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ));

export default store;
