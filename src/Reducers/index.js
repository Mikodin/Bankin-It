import {
  UPDATE_INCOME,
  ADD_BILL,
  DELETE_BILL,
  MODIFY_BILL,
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  MODIFY_ACCOUNT,
} from '../Actions/types';


const initialState = {
  income: 0,
  bills: [],
  billsTotal: 0,
  IncomeAfterBills: 0,
  Accounts: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_INCOME: {
      const income = action.payload;
      const incomeAfterBills = income - state.billsTotal;
      return Object.assign({}, state, { income, incomeAfterBills });
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

    case ADD_ACCOUNT:
      return state;

    case MODIFY_ACCOUNT:
      return state;

    case DELETE_ACCOUNT:
      return state;

    default:
      return state;
  }
}
