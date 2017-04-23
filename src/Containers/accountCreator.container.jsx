import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Input, Button, Form } from 'semantic-ui-react';

import { addAccount } from '../Actions/account.actions';
import Account from '../Models/account.model';
import { isValidNumberInput } from '../Utilities/inputValidation.utility';

class AccountCreator extends Component {
  static propTypes = {
    addAccount: PropTypes.func,
    incomeAfterBills: PropTypes.number,
    parentAccount: PropTypes.instanceOf(Account),
  }

  static defaultProps = {
    addAccount: undefined,
    incomeAfterBills: 0,
    parentAccount: undefined,
  }

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      percentageOfParent: '',
      percentageForChildren: '',
    };
  }

  updateName = (event) => {
    const name = event.target.value;
    this.setState({ name });
  }

  updatePercentageOfParent = (event) => {
    const percentageOfParent = event.target.value;

    if (isValidNumberInput(event.target.value))
      this.setState({ percentageOfParent });
  }

  addAccount = () => {
    const account = new Account(
      this.state.name,
      this.props.incomeAfterBills,
      this.state.percentageOfParent);
    this.props.addAccount(account, this.props.parentAccount);
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <Input
              label="Account Name"
              placeholder="Account Name"
              value={this.state.name}
              onChange={(event) => this.updateName(event)} />
          </Form.Field>
          <Form.Field>
            <Input
              label="Account Percentage"
              placeholder="Account Percentage"
              value={this.state.percentageOfParent}
              onChange={(event) => this.updatePercentageOfParent(event)} />
          </Form.Field>
          <Button type="button" onClick={this.addAccount}>Add Account</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {
  };
};

const mapDispatchToProps = {
  addAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountCreator);
