import { ADD_BILL, DELETE_BILL } from '../Actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case ADD_BILL:
      return state.concat(action.payload);

    case DELETE_BILL:
      return state.filter(bill => bill.billName !== action.payload);

    default:
      return state;
  }
}
