import React, { Component } from 'react';
import Account from '../Models/Account.js';

class SpendingAccount extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      spendingAccount: this.props.spendingAccount,
      accountName: '',
      percentage: 0
    }
  }

  handleSubmitAccount = (e) => {
    var account = new Account(this.state.accountName,0, this.state.percentage);
    this.props.updateSpendingAccount(account);
  }

  handleAccountNameChange = (e) => {
    this.setState({accountName: e.target.value})
  } 

  handlePercentageChange = (e) => {
    this.setState({percentage: e.target.value})
  } 

  render() {
    return (
      <div className="SpendingAccount">
        <fieldset>
          <legend>Spending Account</legend>
          <input value={this.state.accountName}
            onChange={this.handleAccountNameChange} />

          <legend>Enter the percentage of each paycheck you want to spend</legend>
          <input value={this.state.percentage}
            onChange={this.handlePercentageChange} />

          <button onClick={this.handleSubmitAccount}>Add Account</button>
        </fieldset>

        <p>{this.props.spendingAccount.accountName}</p>
        <p>{this.props.spendingAccount.percentage}</p>
        <p>{this.props.spendingAccount.total}</p>
      </div>
    )

  }
}

export default SpendingAccount;
