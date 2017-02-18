import React, { Component } from 'react';
import ParentAccountCreator from './ParentAccountCreator.jsx';
import Account from '../Models/Account.js';

import './ParentAccount.css';

class ParentAccount extends Component {
  constructor(props) {
    super(props);

    this.handleAddToChildAccounts = this.handleAddToChildAccounts.bind(this);

    this.state = {
      mainAccount: new Account('', 0, 0),
    }
  }

  componentDidMount() {
    this.setState({mainAccount: this.props.parentAccount});
  }

  handleAddToChildAccounts(account) {
    var mainAccount = this.state.mainAccount;
    var childAccounts = this.state.mainAccount.subAccounts.slice();
    childAccounts.push(account);

    mainAccount.subAccounts = childAccounts;

    this.setState({mainAccount: mainAccount});
  }

  handlePercentageSubtraction(amount) {
    var newPercentage = this.state.mainAccount.percentage - amount;
    var mainAccount = this.state.mainAccount;
    mainAccount.percentage = newPercentage;

    this.setState({mainAccount: mainAccount})
  }

  render() {
    return (
      <div className='parentAccount'>
        <div>
          <p>Account name: {this.state.mainAccount.accountName}</p>
          <p>Percentage: {this.state.mainAccount.percentage}</p>
          <p>Total: { this.state.mainAccount.total }</p>
        </div>

        <div>
          <ParentAccountCreator
            incomeAfterBills={this.state.mainAccount.total} 
            percentage={this.state.mainAccount.percentage} 
            addToParentAccounts={this.handleAddToChildAccounts}
          />
        </div>

        <div> 
          <ul><AccountList subAccounts={this.state.mainAccount.subAccounts} /> </ul>
        </div>

      </div>
    )
  }
}

export default ParentAccount;

function AccountList(props) {
  const accounts = props.subAccounts;
  const accountListItems = accounts.map((account) => 
      <li key={account.accountName}>
        <ParentAccount parentAccount={account} />
      </li>
  );

  return (
    <div>
      <h3>Child Accounts</h3>
      <ul>{accountListItems}</ul>
    </div>
  )
}

