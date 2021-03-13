import { combineReducers } from 'redux';
import userReducer from './users';
import postsReducer from './posts';

const appReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
});

export default appReducer;
