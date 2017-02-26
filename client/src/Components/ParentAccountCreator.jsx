import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';

import Account from '../Models/Account.js';

class ParentAccountCreator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountName: '',
      percentage: 0,
    }
  }

  handleAccountNameChange = (event) => {
    this.setState({accountName: event.target.value});
  }

  handlePercentageChange = (event) => {
    this.setState({percentage: event.target.value});
  }

  addToParentAccounts = () => {
    var account = new Account(
      this.state.accountName, 
      this.props.incomeAfterBills,
      this.state.percentage)

    this.props.addToParentAccounts(account);
  }

  render() {
    const { accountName, percentage } = this.state;
    return (
      <div className="AccountCreator">
        <fieldset>
          <legend>Enter Account name</legend>
          <input value={accountName}
            onChange={this.handleAccountNameChange} />

          <legend>Enter the percentage of each paycheck it gets</legend>
          <input value={percentage}
            onChange={this.handlePercentageChange} />

          <button onClick={this.addToParentAccounts}>Add Account</button>
        </fieldset>
      </div>
    )
  }
}

export default ParentAccountCreator ;
