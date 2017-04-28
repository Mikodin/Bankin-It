import { UPDATE_INCOME } from './types';

export const updateIncome = (income) =>
  ({
    type: UPDATE_INCOME,
    payload: +income,
  });
