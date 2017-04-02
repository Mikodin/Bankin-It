import { ADD_BILL } from './types';

export const addBill = (bill) => {
  return dispatch => {
    dispatch({
      type: ADD_BILL,
      payload: bill
    });
  }
}
