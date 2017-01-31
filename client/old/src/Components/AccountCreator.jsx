import React, { Component } from 'react';

class Account {
  constructor(name, percentage) {
    this.accountName = name;
    this.percentage = percentage;
    this.money = 0;
  }
}

class AccountCreator extends Component {
  constructor(props){
    super(props);

    this.state = {
      accountName: '',
      percentage: ''
    };

    this.handleAccountNameChange = this.handleAccountNameChange.bind(this);
    this.handlePercentageChange = this.handlePercentageChange.bind(this);

    this.handleSubmitAccount = this.handleSubmitAccount.bind(this);
  }

  handleAccountNameChange(e) {
    this.setState({accountName: e.target.value});
  }

  handlePercentageChange(e) {
    this.setState({percentage: e.target.value});
  }

  handleSubmitAccount(e) {
    var account = new Account(this.state.accountName, this.state.percentage);
    this.props.addAccount(account);
  }

  render() {
    return (
      <div className="AccountCreator">
        <fieldset>
          <legend>Enter Account name</legend>
          <input value={this.state.accountName}
            onChange={this.handleAccountNameChange} />

          <legend>Enter the percentage of each paycheck it gets</legend>
          <input value={this.state.percentage}
            onChange={this.handlePercentageChange} />

          <button onClick={this.handleSubmitAccount}>Add Account</button>
        </fieldset>
      </div>
    );
  }
}

export default AccountCreator;
