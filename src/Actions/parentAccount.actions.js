import {
  ADD_PARENT_ACCOUNT,
  DELETE_PARENT_ACCOUNT,
  MODIFY_PARENT_ACCOUNT,
} from './types';

export const addParentAccount = (account) =>
  dispatch => {
    dispatch({
      type: ADD_PARENT_ACCOUNT,
      payload: account,
    });
  };

export const deleteParentAccount = (account) =>
  dispatch => {
    dispatch({
      type: DELETE_PARENT_ACCOUNT,
      payload: account,
    });
  };

export const modifyParentAccount = (account) =>
  dispatch => {
    dispatch({
      type: MODIFY_PARENT_ACCOUNT,
      payload: account,
    });
  };
