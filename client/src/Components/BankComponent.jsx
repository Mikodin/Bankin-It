import React, { Component } from 'react';
import { Container, Col, Row, Form, 
  FormGroup, Label, Input, Jumbotron } from 'reactstrap';

import ParentAccountCreator from './ParentAccountCreator.jsx';
import ParentAccount from './ParentAccount.jsx';

import './BankComponent.css';

class Bank extends Component {
  constructor(props) {
    super(props);

    this.state = {
      monthlyIncome: 0,
      bills: 0,
      incomeAfterBills: 0,
      percentage: 1,
      parentAccounts: [],
    };
  }

  //property initializer
  handleUpdateMonthlyIncome = (event) => {
    const amount = event.target.value;

    this.setState({ monthlyIncome: amount });
    this.calculateUpdateAfterBills();
  };

  handleUpdateBills = (event) => {
    const amount = event.target.value;

    this.setState({ bills: amount })
    this.calculateUpdateAfterBills();
  };

  calculateUpdateAfterBills = () => {

    this.setState((state) => ({
      incomeAfterBills: state.monthlyIncome - state.bills
    }), this.updateAccountsAfterIncomeChange);

  }

  updateAccountsAfterIncomeChange = () => {
    var accounts = this.state.parentAccounts.map((account) => {
      account = account.reCalculateTotal(this.state.incomeAfterBills);

      return account;
    });

    this.handleAccountsChange(accounts);
  }

  handleAccountsChange = (accounts) => {
    this.setState({parentAccounts: accounts});
  }

  handleAddToParentAccounts = (account) => {
    var parentAccounts = this.state.parentAccounts.slice();
    parentAccounts.push(account);

    this.handlePercentageSubtraction(account.percentage);

    this.setState({parentAccounts: parentAccounts});
  }

  handlePercentageSubtraction = (amount) => {
    var newPercentage = this.state.percentage - amount;

    this.setState({percentage: newPercentage})
  }

  render() {
    const {monthlyIncome, bills, incomeAfterBills, parentAccounts,
      percentage} = this.state;

    return (
      <div className="Bank">
        <Jumbotron fluid className='header'>
          <Container fluid>
            <h1 
              className="bankin-header" 
              style={{fontFamily: 'Barrio, cursive'}}> 
              Bankin
              <span className="text-warning">-it
              </span>
            </h1>
          </Container>
        </Jumbotron>

        <Container>
          <h4>Monthlies</h4>

          <Row>
            <Col sm={12}>
              <Form inline>
                <FormGroup >
                  <Label for="monthlyIncome" sm={2}>Income</Label>
                  <Input 
                    id="monthlyIncome" 
                    name="monthlyIncome" 
                    type="number" 
                    value={monthlyIncome}
                    onChange={this.handleUpdateMonthlyIncome}
                    placeholder="Enter your monthly income" />
                </FormGroup>
                {' '}
                <FormGroup>
                  <Label for="monthlyBills" sm={2}>Bills</Label>
                  <Input 
                    id="monthlyBills"
                    name="monthlyBills"
                    type="number"
                    value={bills}
                    onChange={this.handleUpdateBills}
                    placeholder="Enter your monthly bills" />
                </FormGroup>
                {''}
              </Form>
            </Col>
          </Row>

          <Row>
            <Col sm={12}>
              <Jumbotron style={{textAlign: 'left', padding: 10 + 'px'}}>
                <h3 className='income-after-bills' >
                  Income After bills: 
                </h3>
                <h2>{incomeAfterBills}</h2>
              </Jumbotron>
            </Col>
          </Row>

          <h4>Create a parent account</h4>
          <ParentAccountCreator
            incomeAfterBills={incomeAfterBills} 
            percentage={percentage} 
            addToParentAccounts={this.handleAddToParentAccounts}
          />

        <div>
          <ParentAccountList parentAccounts={parentAccounts} />
        </div>

      </Container>
    </div>
    );
  }
}

function ParentAccountList(props) {
  const accounts = props.parentAccounts;
  const accountListItems = accounts.map((account) => 
      <Col key={account.accountName} sm="4">
        <ParentAccount parentAccount={account} />
      </Col>
  );

  return (
    <div>
      <h3>Main Accounts</h3>
      <Container>
        <Row>
          {accountListItems}
        </Row>
      </Container>
    </div>
  )
}

export default Bank;
