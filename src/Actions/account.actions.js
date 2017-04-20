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
