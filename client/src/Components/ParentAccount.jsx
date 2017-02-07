import React, { Component } from 'react';
import ParentAccountCreator from './ParentAccountCreator.jsx';
import Account from '../Models/Account.js';

class ParentAccount extends Component {
  constructor(props) {
    super(props);

    this.handleAddToChildAccounts = this.handleAddToChildAccounts.bind(this);

    this.state = {
      mainAccount: {},
    }

  }

  componentDidMount() {
    this.setState({mainAccount: this.props.parentAccount});
  }

  handleAddToChildAccounts(account) {
    var mainAccount = this.state.mainAccount;
    var childAccounts = this.mainAccount.subAccounts.slice();
    childAccounts.push(account);

    this.handlePercentageSubtraction(account.percentage);

    this.setState({childAccounts: childAccounts});
    console.log('Firing?');
  }

  handlePercentageSubtraction(amount) {
    var newPercentage = this.state.percentage - amount;

    this.setState({percentage: newPercentage})
  }

  render() {
    return (
      <div>
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
      </div>
    )
  }
}

export default ParentAccount;
