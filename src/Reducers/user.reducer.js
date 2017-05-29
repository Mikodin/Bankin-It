/* eslint jsx-a11y/img-has-alt: 0 */

import {
  USER_RESET_STATE,
  UPDATE_INCOME,
  ADD_BILL,
  DELETE_BILL,
  MODIFY_BILL,
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  MODIFY_ACCOUNT,
} from '../Actions/types';

const initialState = {
  income: 0,
  bills: [],
  billsTotal: 0,
  incomeAfterBills: 0,
  accounts: [],
};

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

function updateIncomeInTree(accountList, newIncome) {
  return accountList.map((account) => {
    const { calculateAmount, percentageOfParent } = account;
    /*
     * TODO: Refactor
     * I know I'm mutating the object, Object.assign isn't copying deep enough.
     * Open for suggestions
    */
    // eslint-disable-next-line no-param-reassign
    account.amount = calculateAmount(newIncome, percentageOfParent);

    if (account.childAccounts.length >= 1)
      updateIncomeInTree(account.childAccounts, account.amount);

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

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_RESET_STATE: {
      return Object.assign({}, initialState);
    }
    case UPDATE_INCOME: {
      const income = action.payload;
      const incomeAfterBills = income - state.billsTotal;
      const accounts = updateIncomeInTree(
        state.accounts.slice(),
        incomeAfterBills);
      return Object.assign({}, state, { income, incomeAfterBills, accounts });
    }

    case ADD_BILL: {
      const bills = [...state.bills, action.payload];
      const billsTotal = bills.map((bill) => +bill.amount)
      .reduce((inc, amount) => inc + amount);
      const incomeAfterBills = state.income - billsTotal;
      const accounts = updateIncomeInTree(
        state.accounts.slice(),
        incomeAfterBills);

      return Object.assign({}, state,
        {
          bills,
          billsTotal,
          incomeAfterBills,
          accounts,
        });
    }

    case DELETE_BILL: {
      const bills = state.bills.filter((bill) => bill.id !== action.payload);
      const billsTotal = bills.length > 0
      ? bills.map((bill) => +bill.amount).reduce((inc, amount) => inc + amount)
      : 0;
      const incomeAfterBills = state.income - billsTotal;

      return Object.assign({}, state, {
        bills,
        billsTotal,
        incomeAfterBills,
      });
    }

    case MODIFY_BILL:
      return state;

    case ADD_ACCOUNT: {
      const account = action.payload;
      if (account.parentId) {
        const mutableAccounts = state.accounts.slice();
        const accounts = insertAccountIntoTree(
          mutableAccounts,
          account,
          account.parentId);

        return Object.assign({}, state, { accounts });
      }

      const accounts = [...state.accounts, account];
      return Object.assign({}, state, { accounts });
    }

    case MODIFY_ACCOUNT:
      return state;

    case DELETE_ACCOUNT: {
      const accounts = deleteAccountFromTree(state.accounts.slice(), action.payload.id);

      return Object.assign({}, state, { accounts });
    }

    default:
      return state;
  }
}
