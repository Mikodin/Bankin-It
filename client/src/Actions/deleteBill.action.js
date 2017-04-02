import { DELETE_BILL } from './types';

export const deleteBill = (billName) => {
  return dispatch => {
    dispatch({
      type: DELETE_BILL,
      payload: billName,
    });
  };
};
