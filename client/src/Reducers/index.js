import { combineReducers } from 'redux';
import billReducer from './bill.reducer';

export const rootReducer = combineReducers({
  bills: billReducer,
});

