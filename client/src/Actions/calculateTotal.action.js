import { CALCULATE_TOTAL } from './types';

export const calculateTotal = (bills) => {
  return dispatch => {
    dispatch({
      type: CALCULATE_TOTAL,
      payload: bills,
    });
  };
};
