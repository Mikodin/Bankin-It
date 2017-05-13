import {
  UPDATE_INCOME,
  ADD_BILL,
  DELETE_BILL,
  MODIFY_BILL,
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  MODIFY_ACCOUNT,
} from '../Actions/types';

import Account from '../Models/account.model';

const initialState = {
  income: 0,
  bills: [],
  billsTotal: 0,
  incomeAfterBills: 0,
  accounts: [],
};

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

function updateIncomeInAccountsTree(accountList, newIncome) {
  return accountList.map((oldAccount) => {
    const { calculateAmount, percentageOfParent } = oldAccount;
    const amount = calculateAmount(newIncome, percentageOfParent);
    // const account = Object.assign(new Account(), oldAccount, { amount });
    var account = oldAccount;
    account.amount = amount;

    if (account.childAccounts.length >= 1)
      updateIncomeInAccountsTree(account.childAccounts, amount);

    console.log(account);
    return account;
  });
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_INCOME: {
      const income = action.payload;
      const incomeAfterBills = income - state.billsTotal;
      const accounts = updateIncomeInAccountsTree(state.accounts, incomeAfterBills);
      return Object.assign({}, state, { income, incomeAfterBills, accounts });
    }

    case ADD_BILL: {
      const bills = [...state.bills, action.payload];
      const billsTotal = bills.map((bill) => +bill.amount)
      .reduce((inc, amount) => inc + amount);
      const incomeAfterBills = state.income - billsTotal;

      return Object.assign({}, state,
        {
          bills,
          billsTotal,
          incomeAfterBills,
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

    case MODIFY_BILL: {
      const bills = state.bills.map((bill) => {
        return bill.id === action.apyload.originBillId
          ? action.payload.modBill
          : bill;
      });

      return Object.assign({}, state, {
        bills,
      });
    }

    case ADD_ACCOUNT: {
      if (action.payload.parentAccount) {
        const mutableAccounts = state.accounts.slice();
        const accounts = insertIntoAccountsTree(
          mutableAccounts,
          action.payload.childAccount,
          action.payload.parentAccount.id);

        return Object.assign({}, state, { accounts });
      }

      const accounts = [...state.accounts, action.payload.childAccount];
      return Object.assign({}, state, { accounts });
    }

    case MODIFY_ACCOUNT:
      return state;

    case DELETE_ACCOUNT:
      return state;

    default:
      return state;
  }
}
