/* eslint jsx-a11y/img-has-alt: 0 */

import { combineReducers } from 'redux';

import userReducer from './user.reducer';
import firebaseReducer from './firebase.reducer';

export const rootReducer = combineReducers({
  userReducer,
  firebaseReducer,
});
