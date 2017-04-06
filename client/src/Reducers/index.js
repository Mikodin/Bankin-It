import { combineReducers } from 'redux';
import billReducer from './bill.reducer';
import totalReducer from './total.reducer';

export const rootReducer = combineReducers({
  bills: billReducer,
  total: totalReducer,
});

