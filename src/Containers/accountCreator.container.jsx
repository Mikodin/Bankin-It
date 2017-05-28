/* eslint jsx-a11y/img-has-alt: 0 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Input, Button, Form } from 'semantic-ui-react';

import { addAccount } from '../Actions/account.actions';
import { fbAddAccount } from '../Actions/firebase.actions';
import Account from '../Models/account.model';
import { isValidNumberInput } from '../Utilities/inputValidation.utility';

class AccountCreator extends Component {
  static propTypes = {
    addAccount: PropTypes.func,
    incomeAfterBills: PropTypes.number,
    parentAccount: PropTypes.instanceOf(Account),
    uid: PropTypes.string,
    fbAddAccount: PropTypes.func,
  }

  static defaultProps = {
    addAccount: undefined,
    incomeAfterBills: 0,
    parentAccount: undefined,
    fbAddAccount: undefined,
    uid: undefined,
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

    if (isValidNumberInput(percentageOfParent) && percentageOfParent <= 100)
      this.setState({ percentageOfParent });
  }

  addAccount = () => {
    const { name, percentageOfParent } = this.state;
    const amount = this.props.parentAccount
      ? this.props.parentAccount.amount
      : this.props.incomeAfterBills;
    const parentId = this.props.parentAccount
      ? this.props.parentAccount.id
      : false;

    const account = new Account(name, amount, percentageOfParent, parentId);

    if (this.props.uid)
      this.props.fbAddAccount(this.props.uid, account, this.props.parentAccount);

    this.props.addAccount(account, this.props.parentAccount);
    this.setState({
      name: '',
      percentageOfParent: '',
      percentageForChildren: '',
    });
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

const mapStateToProps = (state) => {
  return {
    incomeAfterBills: state.userReducer.incomeAfterBills,
    uid: state.firebaseReducer.user.uid,
  };
};

const mapDispatchToProps = {
  addAccount,
  fbAddAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountCreator);
