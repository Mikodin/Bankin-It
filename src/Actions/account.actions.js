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

export const deleteAccount = (account) =>
  dispatch => {
    dispatch({
      type: DELETE_ACCOUNT,
      payload: account,
    });
  };

export const modifyAccount = (account) =>
  dispatch => {
    dispatch({
      type: MODIFY_ACCOUNT,
      payload: account,
    });
  };
