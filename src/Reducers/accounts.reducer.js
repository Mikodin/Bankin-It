import {
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  MODIFY_ACCOUNT,
} from '../Actions/types';

const initialState = [];

let mutableState = [];

function traverseAccountsAndInsert(accounts, accountToAdd, idToFind) {
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].id === idToFind) {
      accounts[i].childAccounts.push(accountToAdd);
      return;
    }

    if (accounts[i].childAccounts.length > 1)
      traverseAccountsAndInsert(accounts[i].childAccounts, accountToAdd, idToFind);
  }
}

function insertAccountIntoState(state, parentAccount, childAccount) {
  mutableState = state.slice();
  const idToAddChildAccountTo = parentAccount.id;

  traverseAccountsAndInsert(mutableState, childAccount, idToAddChildAccountTo);
  return mutableState;
}

export default function accountsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ACCOUNT: {
      return action.parentAccount
      ? insertAccountIntoState(state, action.parentAccount, action.payload)
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
