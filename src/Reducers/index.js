import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';

import userReducer from './user.reducer';

export const rootReducer = combineReducers({
  userReducer,
  firebase: firebaseStateReducer,
});
