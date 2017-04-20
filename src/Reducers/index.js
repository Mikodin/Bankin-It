import { combineReducers } from 'redux';
import billsReducer from './bills.reducer';
import monthliesReducer from './monthlies.reducer';
import accountsReducer from './accounts.reducer';

export const rootReducer = combineReducers({
  bills: billsReducer,
  monthlies: monthliesReducer,
  accounts: accountsReducer,
});
