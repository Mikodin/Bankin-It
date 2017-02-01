import React, { Component } from 'react';
import Input from './Input.jsx'
import ParentAccount from './ParentAccount.jsx'

class Bank extends Component {
  constructor(props) {
    super(props);

    this.handlePercentageSubtraction = this.handlePercentageSubtraction.bind(this);
    this.handleUpdateMonthlyIncome = this.handleUpdateMonthlyIncome.bind(this);
    this.handleUpdateBills = this.handleUpdateBills.bind(this);


    this.state = {
      monthlyIncome: 0,
      bills: 0,
      incomeAfterBills: 0,
      percentage: 1,
    }
  }

  handleUpdateMonthlyIncome(amount) {
    this.setState({monthlyIncome: amount})
    this.updateIncomeAfterBills();
  }

  handleUpdateBills(amount) {
    this.setState({bills: amount})
    this.updateIncomeAfterBills();
  }

  updateIncomeAfterBills() {
    this.setState((state) => ({
      incomeAfterBills: state.monthlyIncome - state.bills
    }))
  }

  handlePercentageSubtraction(amount) {
    var newPercentage = this.state.percentage - amount;

    this.setState({percentage: newPercentage})
  }

  render() {
    return (
      <div className="Bank">
        <h1>Bank</h1>
        <div>
          <p>Enter your monthly Income</p>
          <Input 
            value={this.state.monthlyIncome} 
            handleValueChange={this.handleUpdateMonthlyIncome} />
        </div>

        <div>
          <p>Enter your monthly Bills</p>
          <Input 
            value={this.state.bills} 
            handleValueChange={this.handleUpdateBills} />
        </div>

        <div>
          <p>Income After bills:</p>
          <p>{this.state.incomeAfterBills}</p>
        </div>

        <ParentAccount 
          incomeAfterBills={this.state.incomeAfterBills} 
          percentage={this.state.percentage} />

      </div>
    );
  }
}

export default Bank;
