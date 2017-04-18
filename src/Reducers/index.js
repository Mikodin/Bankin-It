import { combineReducers } from 'redux';
import billsReducer from './bills.reducer';
import monthliesReducer from './monthlies.reducer';
import parentAccountsReducer from './parentAccounts.reducer';

export const rootReducer = combineReducers({
  bills: billsReducer,
  monthlies: monthliesReducer,
  parentAccounts: parentAccountsReducer,
});
