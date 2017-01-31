import React, { Component } from 'react';
import Account from '../Models/Account.js';

class Bank extends Component {
  constructor(props) {
    super(props);

    this.state = {
      monthlyIncome: 0,
      bills: 0,
      incomeAfterbills: 0,
      spending: new Account(0,0),
      saving: new Account(0,0)
    }
  }

  render() {
    return (
      <div className="Bank">
      <h1>Bank</h1>
    </div>

    );
  }
}

export default Bank;
