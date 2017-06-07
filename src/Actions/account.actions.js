/* eslint jsx-a11y/img-has-alt: 0 */

import {
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  MODIFY_ACCOUNT,
} from './types';


function insertAccountIntoTree(accountList, accountToAdd, idToFind) {
  return accountList.map((account) => {
    if (account.id === idToFind) {
      account.childAccounts.push(accountToAdd);
      return account;
    }
    if (account.childAccounts.length >= 1)
      insertAccountIntoTree(account.childAccounts, accountToAdd, idToFind);

    return account;
  });
}

function deleteAccountFromTree(accountList, accountIdToRemove) {
  return accountList.filter((account) => {
    /*
     * TODO: Refactor
     * I know I'm mutating the object, Object.assign isn't copying deep enough.
     * Open for suggestions
    */
    // eslint-disable-next-line no-param-reassign
    account.childAccounts = account.childAccounts.filter((childAcc) => {
      return childAcc.id !== accountIdToRemove;
    });

    if (account.childAccounts)
      deleteAccountFromTree(account.childAccounts, accountIdToRemove);

    return account.id !== accountIdToRemove;
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
      accounts = [...getState().userReducer.accounts, account];
    }

    dispatch({
      type: ADD_ACCOUNT,
      payload: { accounts },
    });
  };

export const deleteAccount = (accountId) =>
  (dispatch, getState) => {
    const accounts = deleteAccountFromTree(getState().userReducer.accounts.slice(), accountId);
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
