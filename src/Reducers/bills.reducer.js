import { ADD_BILL, DELETE_BILL, MODIFY_BILL } from '../Actions/types';

const initialState = [];

export default function billsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_BILL:
      return state.concat(action.payload);

    case DELETE_BILL:
      return state.filter(bill => bill.id !== action.payload.id);

    case MODIFY_BILL:
      return state;

    default:
      return state;
  }
}
