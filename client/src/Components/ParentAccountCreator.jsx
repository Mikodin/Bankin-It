import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import Account from '../Models/Account.js';

class ParentAccountCreator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountName: '',
      percentage: 0,
    }
  }

  handleAccountNameChange = (event) => {
    this.setState({accountName: event.target.value});
  }

  handlePercentageChange = (event) => {
    if (event.target.value > 100) return;
    this.setState({percentage: event.target.value});
  }

  addToParentAccounts = (event) => {
    event.preventDefault();

    var account = new Account(
      this.state.accountName, 
      this.props.incomeAfterBills,
      this.state.percentage)

    this.props.addToParentAccounts(account);
  }

  render() {
    const { accountName, percentage } = this.state;
    return (
      <div className="AccountCreator">
        <Form>
          <FormGroup row>
            <Label for="accountName" sm={2}>Account Name</Label>
            <Col sm={6}>
              <Input 
                id="accountName" 
                name="accountName" 
                type="text" 
                value={accountName}
                onChange={this.handleAccountNameChange}
                placeholder="Enter a unique account name" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="accountPercentage" sm={2}>Percentage</Label>
            <Col sm={6}>
              <Input 
                id="percentage"
                name="percentage"
                type="number"
                value={percentage}
                onChange={this.handlePercentageChange}
                placeholder="Enter what percentage of the whole it gets" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={10}>
              <Button color='primary' onClick={this.addToParentAccounts}>
                Add Account</Button>
            </Col>
          </FormGroup>

        </Form>
      </div>

    )
  }
}

export default ParentAccountCreator ;
