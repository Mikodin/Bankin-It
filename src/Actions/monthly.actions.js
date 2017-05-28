/* eslint jsx-a11y/img-has-alt: 0 */

import { UPDATE_INCOME } from './types';

export const updateIncome = (income) =>
  ({
    type: UPDATE_INCOME,
    payload: +income,
  });
