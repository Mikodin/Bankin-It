import { ADD_BILL, DELETE_BILL, MODIFY_BILL } from './types';

export const addBill = (bill) =>
  dispatch => {
    dispatch({
      type: ADD_BILL,
      payload: bill,
    });
  };

export const deleteBill = (id) =>
  dispatch => {
    dispatch({
      type: DELETE_BILL,
      payload: id,
    });
  };

export const modifyBill = (origBillId, modBill) =>
  dispatch => {
    dispatch({
      type: MODIFY_BILL,
      payload: {
        origBillId,
        modBill,
      },
    });
  };
