import React, { Component, PropTypes } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import Account from '../Models/Account';

class ParentAccountCreator extends Component {
  static propTypes = {
    incomeAfterBills: PropTypes.number,
    addToParentAccounts: PropTypes.func,
  }

  static defaultProps = {
    incomeAfterBills: 0,
    addToParentAccounts: {},
  }

  constructor(props) {
    super(props);

    this.state = {
      accountName: '',
      percentage: '',
    };
  }

  handleAccountNameChange = (event) => {
    this.setState({ accountName: event.target.value });
  }

  handlePercentageChange = (event) => {
    const input = event.target.value;

    if (this.isValidNumberInput(input)) {
      this.setState({ percentage: input });
    }
  }

  isValidNumberInput(input) {
    const reg = /^$|\d+$/;

    return reg.test(input);
  }

  addToParentAccounts = (event) => {
    event.preventDefault();
    const { accountName, percentage } = this.state;
    const { incomeAfterBills } = this.props;

    if (accountName && percentage) {
      const account = new Account(
        accountName,
        incomeAfterBills,
        percentage);

      this.props.addToParentAccounts(account);
    }
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
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                value={percentage}
                onChange={this.handlePercentageChange}
                placeholder="Enter what percentage of the whole it gets" />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col sm={10}>
              <Button color="primary" onClick={this.addToParentAccounts}>
                Add Account</Button>
            </Col>
          </FormGroup>

        </Form>
      </div>

    );
  }
}

export default ParentAccountCreator;
