/* eslint jsx-a11y/img-has-alt: 0 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Input, Button, Form } from 'semantic-ui-react';

import Account from '../Models/account.model';

import {
  googleLogin,
  login,
  logout,
  register,
  fbGetBills,
  fbGetIncome,
  fbGetAccounts,
} from '../Actions/firebase.actions';

import { addBill } from '../Actions/bill.actions';
import { addAccount } from '../Actions/account.actions';
import { updateIncome } from '../Actions/monthly.actions';

class Login extends Component {
  static propTypes = {
    login: PropTypes.func,
    googleLogin: PropTypes.func,
    logout: PropTypes.func,
    register: PropTypes.func,
    fbGetBills: PropTypes.func,
    addBill: PropTypes.func,
    fbGetIncome: PropTypes.func,
    updateIncome: PropTypes.func,
    fbGetAccounts: PropTypes.func,
    addAccount: PropTypes.func,
  }

  static defaultProps = {
    login: undefined,
    googleLogin: undefined,
    logout: undefined,
    register: undefined,
    fbGetBills: undefined,
    addBill: undefined,
    fbGetIncome: undefined,
    updateIncome: undefined,
    fbGetAccounts: undefined,
    addAccount: undefined,
  }

  constructor(props) {
    super(props);

    this.state = {
      email: 'someemail123@gmail.com',
      password: 'test12345',
    };
  }

  updateEmail = (event) => {
    const email = event.target.value;
    this.setState({ email });
  }

  updatePassword = (event) => {
    const password = event.target.value;
    this.setState({ password });
  }

  login = () => {
    const { email, password } = this.state;
    const user = { email, password };

    this.props.login(user)
      .then(({ uid }) => {
        this.initializeUser(uid);
      });
  }

  initializeUser = (uid) => {
    this.props.fbGetBills(uid)
      .then((bills) => {
        Object.keys(bills).map((key) => {
          return this.props.addBill(bills[key]);
        });

        this.props.fbGetAccounts(uid)
          .then((accounts) => {
            Object.keys(accounts).map((key) => {
              const { id, name, parentId, percent, percentageOfParent } = accounts[key];
              const accToAdd = new Account(name, 0, percentageOfParent, parentId);
              accToAdd.id = id;
              accToAdd.percent = percent;
              return this.props.addAccount(accToAdd);
            });

            this.props.fbGetIncome(uid)
              .then((income) => {
                this.props.updateIncome(income.income);
              });
          });
      });
  }

  logout = () => {
    this.props.logout();
  }

  register = () => {
    const { email, password } = this.state;
    const user = { email, password };
    this.props.register(user);
  }

  googleLogin = () => {
    this.props.googleLogin();
  }

  render() {
    return (
      <div style={{ marginTop: '55px' }}>
        <Form>
          <Form.Field>
            <Input
              label="Email"
              placeholder="Email"
              value={this.state.email}
              onChange={(event) => this.updateEmail(event)} />
          </Form.Field>
          <Form.Field>
            <Input
              label="Password"
              placeholder="Password"
              value={this.state.password}
              onChange={(event) => this.updatePassword(event)} />
          </Form.Field>
          <Button type="button" onClick={this.login}>Login</Button>
          <Button type="button" onClick={this.googleLogin}>Login With Google</Button>
          <Button type="button" onClick={this.register}>Register</Button>
          <Button type="button" onClick={this.logout}>Logout</Button>
          <Button type="button" onClick={this.getBills}>Get Bills</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = {
  login,
  googleLogin,
  logout,
  register,
  fbGetBills,
  addBill,
  fbGetIncome,
  updateIncome,
  fbGetAccounts,
  addAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
