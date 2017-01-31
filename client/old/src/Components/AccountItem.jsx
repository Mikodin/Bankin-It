import React, { Component } from 'react';

class AccountItem extends Component {
  render() {
    return (
      <div className="AccountCreator">
        <p>{this.props.account.accountName}</p>
        <p>{this.props.account.percentage}</p>
        <p>{this.props.account.money}</p>
      </div>
    );
  }
}

export default AccountItem;
