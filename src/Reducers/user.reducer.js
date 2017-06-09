/* eslint jsx-a11y/img-has-alt: 0 */

import {
  USER_RESET_STATE,
  UPDATE_INCOME,
  UPDATE_PERCENT_REMAINING,
  ADD_BILL,
  DELETE_BILL,
  MODIFY_BILL,
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  MODIFY_ACCOUNT,
} from '../Actions/types';

const initialState = {
  income: 0,
  percentRemaining: 100,
  bills: [],
  billsTotal: 0,
  incomeAfterBills: 0,
  accounts: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_RESET_STATE: {
      return Object.assign({}, initialState);
    }

    case UPDATE_INCOME: {
      const { income, incomeAfterBills, accounts } = action.payload;
      return Object.assign({}, state, { income, incomeAfterBills, accounts });
    }

    case UPDATE_PERCENT_REMAINING: {
      const { percentRemaining } = action.payload;
      return Object.assign({}, state, { percentRemaining });
    }

    case ADD_BILL: {
      const bills = [...state.bills, action.payload];
      const billsTotal = bills.map((bill) => +bill.amount)
        .reduce((inc, amount) => inc + amount);
      const incomeAfterBills = state.income - billsTotal;

      return Object.assign({}, state,
        {
          bills,
          billsTotal,
          incomeAfterBills,
        });
    }

    case DELETE_BILL: {
      const bills = state.bills.filter((bill) => bill.id !== action.payload);
      const billsTotal = bills.length > 0
        ? bills.map((bill) => +bill.amount).reduce((inc, amount) => inc + amount)
        : 0;
      const incomeAfterBills = state.income - billsTotal;

      return Object.assign({}, state, {
        bills,
        billsTotal,
        incomeAfterBills,
      });
    }

    case MODIFY_BILL:
      return state;

    case ADD_ACCOUNT: {
      const { accounts } = action.payload;
      return Object.assign({}, state, { accounts });
    }

    case MODIFY_ACCOUNT:
      return state;

    case DELETE_ACCOUNT: {
      const { accounts } = action.payload;
      return Object.assign({}, state, { accounts });
    }

    default:
      return state;
  }
}
