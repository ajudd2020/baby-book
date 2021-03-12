import { createStore, applyMiddleware } from 'redux';
import appReducer from './index';

import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';

const store = createStore(appReducer, applyMiddleware(thunkMiddleware));

export default store;
