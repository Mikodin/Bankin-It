import React, { Component } from 'react';
import Input from './Input.jsx'
import ParentAccount from './ParentAccount.jsx'

class Bank extends Component {
  constructor(props) {
    super(props);

    this.handlePercentageSubtraction = this.handlePercentageSubtraction.bind(this);

    this.state = {
      monthlyIncome: 0,
      bills: 0,
      incomeAfterBills: 0,
      percentage: 1,
    }
  }

  handlePercentageSubtraction(amount) {
    var newPercentage = this.state.percentage - amount;

    this.setState({percentage: newPercentage})
  }

  render() {
    return (
      <div className="Bank">
        <h1>Bank</h1>
        <ParentAccount incomeAfterBills={this.state.incomeAfterBills} 
          percentage={this.state.percentage}
        />

      </div>
    );
  }
}

export default Bank;
