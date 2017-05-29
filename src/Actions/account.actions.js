/* eslint jsx-a11y/img-has-alt: 0 */

import {
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  MODIFY_ACCOUNT,
} from './types';

export const addAccount = (account) =>
  dispatch => {
    dispatch({
      type: ADD_ACCOUNT,
      payload: account,
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
