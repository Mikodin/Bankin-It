/* eslint jsx-a11y/img-has-alt: 0 */

import { UPDATE_INCOME, UPDATE_PERCENT_REMAINING } from './types';

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

export const updateIncome = (income) =>
  (dispatch, getState) => {
    const incomeAfterBills = income - getState().userReducer.billsTotal;
    const accounts = updateIncomeInTree(getState().userReducer.accounts.slice(), incomeAfterBills);
    dispatch({
      type: UPDATE_INCOME,
      payload: { income, incomeAfterBills, accounts },
    });
  };

export const updatePercentRemaining = (amount) =>
  (dispatch, getState) => {
    const currentPercent = getState().userReducer.percentRemaining;
    const percentRemaining = currentPercent + amount;
    dispatch({
      type: UPDATE_PERCENT_REMAINING,
      payload: { percentRemaining },
    });
  };
