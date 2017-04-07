// import firebase from 'firebase';

import React, { Component, PropTypes } from 'react';
import { Container, Col, Row, Form,
  FormGroup, Label, Input, Jumbotron } from 'reactstrap';

import { connect } from 'react-redux';

import { addBill } from '../Actions/addBill.action';
import { deleteBill } from '../Actions/deleteBill.action';
import { calculateTotal } from '../Actions/calculateTotal.action';

import { isValidNumberInput } from '../Utilities/InputValidation.Utility';
import ParentAccountCreator from './ParentAccountCreator';

import BillCreator from './BillCreator';
import ParentAccountList from '../Containers/ParentAccountList';
import BillList from '../Containers/BillList';
import Bill from '../Models/Bill';

import './BankComponent.css';

class Bank extends Component {
  static propTypes = {
    bills: PropTypes.arrayOf(PropTypes.instanceOf(Bill)),
    billsTotal: PropTypes.number
  };

  static defaultProps = {
    bills: [],
    billsTotal: 0,
  };

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

  componentDidMount() {
    /*
    this.firebaseRef = firebase.database().ref('bankin-it');
    this.firebaseRef.on('value', dataSnap => {
    });
    */
  }

  handleUpdateMonthlyIncome = (event) => {
    const amount = event.target.value;

    if (isValidNumberInput(amount)) {
      this.setState({ monthlyIncome: amount });
    }

    this.calculateUpdateAfterBills();
  };

  handleUpdateBills = (event) => {
    const amount = event.target.value;

    if (isValidNumberInput(amount))
      this.setState({ bills: amount });

    this.calculateUpdateAfterBills();
  };

  calculateUpdateAfterBills = () => {
    this.setState((state) => ({
      incomeAfterBills: state.monthlyIncome - this.props.billsTotal,
    }), this.updateAccountsAfterIncomeChange);
  }

  updateAccountsAfterIncomeChange = () => {
    const accounts = this.state.parentAccounts.map((account) => {
      const updatedAcc = account.reCalculateTotal(this.state.incomeAfterBills);

      return updatedAcc;
    });

    this.handleAccountsChange(accounts);
  }

  handleAccountsChange = (accounts) => {
    this.setState({ parentAccounts: accounts });
  }

  handleAddToParentAccounts = (account) => {
    const parentAccounts = this.state.parentAccounts.slice();
    parentAccounts.push(account);

    this.handlePercentageSubtraction(account.percentage);

    this.setState({ parentAccounts });
  }

  handleRemoveFromParentAccounts = (account) => {
    const parentAccounts = this.state.parentAccounts.filter(parentAcc =>
        parentAcc.accountName !== account.accountName);

    this.setState({ parentAccounts });
  }

  handlePercentageSubtraction = (amount) => {
    const newPercentage = this.state.percentage - amount;

    this.setState({ percentage: newPercentage });
  }

  render() {
    const { monthlyIncome, bills, incomeAfterBills, parentAccounts,
      percentage } = this.state;

    return (
      <div className="Bank">
        <div className="input-section">
          <Jumbotron fluid className="header">
            <Container fluid>
              <h1
                className="bankin-header"
                style={{ fontFamily: 'Barrio, cursive' }}>
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
                      type="text"
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
                      type="text"
                      value={bills}
                      onChange={this.handleUpdateBills}
                      placeholder="Enter your monthly bills" />
                  </FormGroup>
                  {''}
                </Form>
              </Col>
            </Row>

            <Row style={{ marginTop: `${20}px` }}>
              <Col sm={8}>
                <BillCreator />
              </Col>
              <Col sm={4}>
                <BillList
                  bills={this.props.bills}
                />
              </Col>
            </Row>

            <Row>
              <Col sm={12}>
                <Jumbotron style={{ textAlign: 'left', padding: `${10}px` }}>
                  <h3 className="income-after-bills" >
                    Income after bills:
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
          </Container>
        </div>

        <div className="accounts">
          <Container>
            <ParentAccountList
              parentAccounts={parentAccounts}
              deleteAccount={this.handleRemoveFromParentAccounts}
            />
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ bills: state.bills, billsTotal: state.total });

export default connect(mapStateToProps, 
  { addBill, deleteBill, calculateTotal})(Bank);
