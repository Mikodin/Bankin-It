/* eslint jsx-a11y/img-has-alt: 0 */

import { ADD_BILL, DELETE_BILL, MODIFY_BILL } from './types';
import { updateIncome } from './monthly.actions';

export const addBill = (bill) =>
  (dispatch, getState) => {
    dispatch({
      type: ADD_BILL,
      payload: bill,
    });
    dispatch(updateIncome(getState().userReducer.income));
  };

export const deleteBill = (id) =>
  (dispatch, getState) => {
    dispatch({
      type: DELETE_BILL,
      payload: id,
    });
    dispatch(updateIncome(getState().userReducer.income));
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
