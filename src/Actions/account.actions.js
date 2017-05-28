/* eslint jsx-a11y/img-has-alt: 0 */

import {
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  MODIFY_ACCOUNT,
} from './types';

export const addAccount = (childAccount, parentAccount = undefined) =>
  dispatch => {
    dispatch({
      type: ADD_ACCOUNT,
      payload: {
        childAccount,
        parentAccount,
      },
    });
  };

export const deleteAccount = (accountId) =>
  dispatch => {
    dispatch({
      type: DELETE_ACCOUNT,
      payload: {
        id: accountId,
      },
    });
  };

export const modifyAccount = (account) =>
  dispatch => {
    dispatch({
      type: MODIFY_ACCOUNT,
      payload: account,
    });
  };
