import React, { Component } from 'react';
import Input from './Input.jsx';
import ParentAccountCreator from './ParentAccountCreator.jsx';
import ParentAccount from './ParentAccount.jsx';

import './BankComponent.css';

class Bank extends Component {
  constructor(props) {
    super(props);

    this.state = {
      monthlyIncome: 0,
      bills: 0,
      incomeAfterBills: 0,
      percentage: 1,
      parentAccounts: []
    }
  }

  handleUpdateMonthlyIncome = (amount) => {
    this.setState({monthlyIncome: amount})
    this.calculateUpdateAfterBills();
  }

  handleUpdateBills = (amount) => {
    this.setState({bills: amount})
    this.calculateUpdateAfterBills();
  }

  calculateUpdateAfterBills = () => {
    this.setState((state) => ({
      incomeAfterBills: state.monthlyIncome - state.bills
    }), this.updateAccountsAfterIncomeChange);
  }

  updateAccountsAfterIncomeChange = () => {
    var accounts = this.state.parentAccounts.map((account) => {
      account = account.reCalculateTotal(this.state.incomeAfterBills);

      return account;
    });

    this.handleAccountsChange(accounts);
  }

  handleAccountsChange = (accounts) => {
    this.setState({parentAccounts: accounts});
  }

  handleAddToParentAccounts = (account) => {
    var parentAccounts = this.state.parentAccounts.slice();
    parentAccounts.push(account);

    this.handlePercentageSubtraction(account.percentage);

    this.setState({parentAccounts: parentAccounts});
  }

  handlePercentageSubtraction = (amount) => {
    var newPercentage = this.state.percentage - amount;

    this.setState({percentage: newPercentage})
  }

  render() {
    const {monthlyIncome, bills, incomeAfterBills, parentAccounts,
      percentage} = this.state;

    return (
      <div className="Bank">
        <h1>Bank</h1>
        <div>
          <p>Enter your monthly Income</p>
          <Input 
            value={monthlyIncome}
            handleValueChange={this.handleUpdateMonthlyIncome} />
        </div>

        <div>
          <p>Enter your monthly Bills</p>
          <Input 
            value={bills} 
            handleValueChange={this.handleUpdateBills} />
        </div>

        <div>
          <p>Income After bills:</p>
          <p>{incomeAfterBills}</p>
        </div>

        <ParentAccountCreator
          incomeAfterBills={incomeAfterBills} 
          percentage={percentage} 
          addToParentAccounts={this.handleAddToParentAccounts}
        />

      <div >
        <AccountList parentAccounts={parentAccounts} />
      </div>

    </div>
    );
  }
}

function AccountList(props) {
  const accounts = props.parentAccounts;
  const accountListItems = accounts.map((account) => 
      <ParentAccount key={account.accountName} parentAccount={account} />
  );

  return (
    <div>
      <h3>Main Accounts</h3>
      <div className='horizontal-aligned'>
        {accountListItems}
      </div>
    </div>
  )
}

export default Bank;
