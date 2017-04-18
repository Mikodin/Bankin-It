import {
  UPDATE_INCOME,
  ADD_BILL,
  DELETE_BILL,
  MODIFY_BILL,
} from '../Actions/types';

const initialState = {
  income: 0,
  billsTotal: 0,
  incomeAfterBills: 0,
};

export default function monthliesReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_INCOME: {
      const incomeAfterBills = action.payload - state.billsTotal;
      return Object.assign({}, state, {
        income: action.payload,
        incomeAfterBills,
      });
    }

    case ADD_BILL: {
      const billsTotal = +state.billsTotal + +action.payload.amount;
      const incomeAfterBills = +state.income - +billsTotal;
      return Object.assign({}, state, {
        billsTotal,
        incomeAfterBills,
      });
    }

    case DELETE_BILL: {
      const billsTotal = +state.billsTotal - +action.payload.amount;
      const incomeAfterBills = +state.income - +billsTotal;
      return Object.assign({}, state, {
        billsTotal,
        incomeAfterBills,
      });
    }

    case MODIFY_BILL:
      return state;

    default:
      return state;
  }
}
