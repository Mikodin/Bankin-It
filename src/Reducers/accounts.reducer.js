import {
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  MODIFY_ACCOUNT,
  UPDATE_INCOME,
} from '../Actions/types';

const initialState = [];

function insertIntoAccountsTree(accountList, accountToAdd, idToFind) {
  return accountList.map((account) => {
    if (account.id === idToFind) {
      account.childAccounts.push(accountToAdd);
      return account;
    }
    if (account.childAccounts.length >= 1)
      insertIntoAccountsTree(account.childAccounts, accountToAdd, idToFind);

    return account;
  });
}

export default function accountsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ACCOUNT: {
      const mutableState = state.slice();
      return action.payload.parentAccount
      ? insertIntoAccountsTree(
          mutableState,
          action.payload.childAccount,
          action.payload.parentAccount.id)
      : state.concat(action.payload.childAccount);
    }

    case DELETE_ACCOUNT:
      return state.filter(account => account.id !== action.payload.id);

    case MODIFY_ACCOUNT:
      return state;

    case UPDATE_INCOME:
      return state;


    default:
      return state;
  }
}
