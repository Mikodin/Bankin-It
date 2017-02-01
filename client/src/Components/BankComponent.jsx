import React, { Component } from 'react';
import Input from './Input.jsx';
import ParentAccountCreator from './ParentAccountCreator.jsx';

class Bank extends Component {
  constructor(props) {
    super(props);

    this.handlePercentageSubtraction = this.handlePercentageSubtraction.bind(this);
    this.handleUpdateMonthlyIncome = this.handleUpdateMonthlyIncome.bind(this);
    this.handleUpdateBills = this.handleUpdateBills.bind(this);
    this.handleAddToParentAccounts = this.handleAddToParentAccounts.bind(this);


    this.state = {
      monthlyIncome: 0,
      bills: 0,
      incomeAfterBills: 0,
      percentage: 1,
      parentAccounts: []
    }
  }

  handleUpdateMonthlyIncome(amount) {
    this.setState({monthlyIncome: amount})
    this.updateIncomeAfterBills();
  }

  handleUpdateBills(amount) {
    this.setState({bills: amount})
    this.updateIncomeAfterBills();
  }

  updateIncomeAfterBills() {
    this.setState((state) => ({
      incomeAfterBills: state.monthlyIncome - state.bills
    }), this.updateAccountsAfterIncomeChange);
  }

  updateAccountsAfterIncomeChange() {
    var accounts = this.state.parentAccounts.map((account) => {
      account.total = account.calculateTotal(this.state.incomeAfterBills);
      return account;
    });

    this.handleAccountsChange(accounts);
  }

  handleAccountsChange(accounts) {
    this.setState({parentAccounts: accounts});
  }

  handlePercentageSubtraction(amount) {
    var newPercentage = this.state.percentage - amount;

    this.setState({percentage: newPercentage})
  }

  handleAddToParentAccounts(account) {
    var parentAccounts = this.state.parentAccounts.slice();
    parentAccounts.push(account);

    this.handlePercentageSubtraction(account.percentage);

    this.setState({parentAccounts: parentAccounts});
  }

  render() {
    return (
      <div className="Bank">
        <h1>Bank</h1>
        <div>
          <p>Enter your monthly Income</p>
          <Input 
            value={this.state.monthlyIncome} 
            handleValueChange={this.handleUpdateMonthlyIncome} />
        </div>

        <div>
          <p>Enter your monthly Bills</p>
          <Input 
            value={this.state.bills} 
            handleValueChange={this.handleUpdateBills} />
        </div>

        <div>
          <p>Income After bills:</p>
          <p>{this.state.incomeAfterBills}</p>
        </div>

        <ParentAccountCreator
          incomeAfterBills={this.state.incomeAfterBills} 
          percentage={this.state.percentage} 
          addToParentAccounts={this.handleAddToParentAccounts}
        />

    </div>
    );
  }
}

export default Bank;
