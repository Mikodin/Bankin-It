import { ADD_BILL, DELETE_BILL, MODIFY_BILL } from './types';

export const addBill = (bill) =>
  dispatch => {
    dispatch({
      type: ADD_BILL,
      payload: bill,
    });
  };

export const deleteBill = (bill) =>
  dispatch => {
    dispatch({
      type: DELETE_BILL,
      payload: bill,
    });
  };

export const modifyBill = (bill) =>
  dispatch => {
    dispatch({
      type: MODIFY_BILL,
      payload: bill,
    });
  };
