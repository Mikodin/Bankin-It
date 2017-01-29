import React, { Component } from 'react';

import MoneyInput from './MoneyInput.jsx'
import AccountCreator from './AccountCreator.jsx'
import AccountItem from './AccountItem.jsx'

class Bank extends Component {
  constructor(props){
    super(props);

    this.onTotalMoneyChange = this.onTotalMoneyChange.bind(this);
    this.addAccount = this.addAccount.bind(this);

    this.state = {
      paycheck: 0,
      accounts: []
    };
  }

  onTotalMoneyChange(value) {
    this.setState({paycheck:value});

    this.setState((prevState,props) => ({
      accounts: this.updateAccounts(prevState)
    }));
  }

  updateAccounts(prevState) {
    var accnts = prevState.accounts.map((account) => {
      account.money = this.calculateMoney(prevState.paycheck, account);
      return account;
    });

    return accnts;
  }

  addAccount(account) {
    var accnts = this.state.accounts;
    var accnt = account;

    accnt.money = this.calculateMoney(this.state.paycheck, accnt);
    accnts.push(accnt);

    this.setState({accounts: accnts});
  }

  calculateMoney(paycheck, account) {
    return paycheck * account.percentage;
  }

  render() {
    return (
      <div className="Bank">
        <MoneyInput 
          onTotalMoneyChange={this.onTotalMoneyChange}
          value={this.state.paycheck} />
        <h2>{this.state.paycheck}</h2>

        <AccountCreator
          addAccount={this.addAccount}
        />

      <AccountList accounts={this.state.accounts}/>
    </div>
    );
  }
}

function AccountList(props) {
  const accounts = props.accounts;
  const accountListItems = accounts.map((account) => 
      <li key={account.accountName}>
        <AccountItem account={account} />
    </li>
  );

  return (
    <div>
      <h3>Accounts</h3>
      <ul>{accountListItems}</ul>
    </div>
  )
}

export default Bank;
