/* eslint jsx-a11y/img-has-alt: 0 */

import {
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  MODIFY_ACCOUNT,
} from './types';

import { updatePercentRemaining } from './monthly.actions';


function insertAccountIntoTree(accountList, accountToAdd, idToFind) {
  return accountList.map((account) => {
    if (account.id === idToFind) {
      const percentRemaining = account.percent - accountToAdd.percentageOfParent;
      percentRemaining >= 0
        ? (() => {
          account.percent = percentRemaining;
          account.childAccounts.push(accountToAdd);
        })()
        : account.error = 'You cannot have more than 100% of the account';
      return account;
    }
    if (account.childAccounts.length >= 1)
      insertAccountIntoTree(account.childAccounts, accountToAdd, idToFind);

    return account;
  });
}

function deleteAccountFromTree(accountList, accountToRemove) {
  return accountList.filter((account) => {
    /*
     * TODO: Refactor
     * I know I'm mutating the object, Object.assign isn't copying deep enough.
     * Open for suggestions
    */
    // eslint-disable-next-line no-param-reassign
    account.childAccounts = account.childAccounts.filter((childAcc) => {
      return childAcc.id !== accountToRemove.id;
    });

    if (account.childAccounts)
      deleteAccountFromTree(account.childAccounts, accountToRemove);

    return account.id !== accountToRemove.id;
  });
}


export const addAccount = (account) =>
  (dispatch, getState) => {
    let accounts;
    if (account.parentId) {
      const mutableAccounts = getState().userReducer.accounts.slice();
      accounts = insertAccountIntoTree(
        mutableAccounts,
        account,
        account.parentId);
    } else {
      if (getState().userReducer.percentRemaining > 0) {
        dispatch(updatePercentRemaining(-account.percentageOfParent));
        accounts = [...getState().userReducer.accounts, account];
      } else
      accounts = getState().userReducer.accounts;
    }

    dispatch({
      type: ADD_ACCOUNT,
      payload: { accounts },
    });
  };

export const deleteAccount = (account) =>
  (dispatch, getState) => {
    const accounts = deleteAccountFromTree(
      getState().userReducer.accounts.slice(), account);

    dispatch({
      type: DELETE_ACCOUNT,
      payload: { accounts },
    });
  };

export const modifyAccount = (account) =>
  dispatch => {
    dispatch({
      type: MODIFY_ACCOUNT,
      payload: account,
    });
  };
