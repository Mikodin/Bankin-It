/* eslint jsx-a11y/img-has-alt: 0 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Input, Button, Form } from 'semantic-ui-react';

import {
  googleLogin,
  login,
  logout,
  register,
  fbGetBills,
 } from '../Actions/firebase.actions';

 import {
   addBill,
 } from '../Actions/bill.actions';

class Login extends Component {
  static propTypes = {
    login: PropTypes.func,
    googleLogin: PropTypes.func,
    logout: PropTypes.func,
    register: PropTypes.func,
    fbGetBills: PropTypes.func,
    uid: PropTypes.string,
    addBill: PropTypes.func,
  }

  static defaultProps = {
    login: undefined,
    googleLogin: undefined,
    logout: undefined,
    register: undefined,
    fbGetBills: undefined,
    uid: undefined,
    addBill: undefined,
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

    this.props.login(user);
  }

  getBills = () => {
    this.props.fbGetBills(this.props.uid);
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
    uid: state.firebaseReducer.user.uid,
  };
};

const mapDispatchToProps = {
  login,
  googleLogin,
  logout,
  register,
  fbGetBills,
  addBill,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
