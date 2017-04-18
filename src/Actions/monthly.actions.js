import { UPDATE_INCOME } from './types';

export const updateIncome = (income) =>
  dispatch => {
    dispatch({
      type: UPDATE_INCOME,
      payload: income,
    });
  };
