import {
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  MODIFY_ACCOUNT,
} from '../Actions/types';

const initialState = [];

function insertIntoAccountsTree(accounts, accountToAdd, idToFind) {
  return accounts.map((account) => {
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
      return action.parentAccount
      ? insertIntoAccountsTree(state, action.payload, action.parentAccount.id)
      : state.concat(action.payload);
    }

    case DELETE_ACCOUNT:
      return state.filter(account => account.id !== action.payload.id);

    case MODIFY_ACCOUNT:
      return state;

    default:
      return state;
  }
}
