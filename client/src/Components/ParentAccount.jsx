import React, { Component } from 'react';
import Account from '../Models/Account.js';

class ParentAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mainAccount: {}
    }

  }

  componentDidMount() {
    this.setState({mainAccount: this.props.parentAccount});
  }

  render() {
    return (
      <div>
        <p>Account name: {this.state.mainAccount.accountName}</p>
        <p>Percentage: {this.state.mainAccount.percentage}</p>
        <p>Total: {this.state.mainAccount.total}</p>
      </div>
    )
  }
}

export default ParentAccount;
