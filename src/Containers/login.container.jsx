/* eslint jsx-a11y/img-has-alt: 0 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Button, Form } from 'semantic-ui-react';

import {
  googleLogin,
  login,
  logout,
  register,
  fbInitUser,
} from '../Actions/firebase.actions';

class LoginContainer extends Component {
  static propTypes = {
    toggleVisible: PropTypes.func,
    login: PropTypes.func,
    googleLogin: PropTypes.func,
    logout: PropTypes.func,
    register: PropTypes.func,
    fbInitUser: PropTypes.func,
  }

  static defaultProps = {
    toggleVisible: undefined,
    login: undefined,
    googleLogin: undefined,
    logout: undefined,
    register: undefined,
    fbInitUser: undefined,
  }

  constructor(props) {
    super(props);

    this.state = {
      email: 'NormalUser@gmail.com',
      password: 'password1234',
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
        this.props.toggleVisible();
      });
  }

  initializeUser = (uid) => {
    this.props.fbInitUser(uid);
  };

  logout = () => {
    this.props.logout();
  }

  register = () => {
    const { email, password } = this.state;
    const user = { email, password };
    this.props.register(user);
    this.props.toggleVisible();
  }

  googleLogin = () => {
    this.props.googleLogin();
  }

  render() {
    return (
      <div style={{ marginTop: '55px' }}>
        <Form>
          <Form.Field>
            <Form.Input
              width={4}
              label="Email"
              placeholder="Email"
              value={this.state.email}
              onChange={(event) => this.updateEmail(event)} />
          </Form.Field>
          <Form.Field>
            <Form.Input
              width={4}
              label="Password"
              placeholder="Password"
              value={this.state.password}
              onChange={(event) => this.updatePassword(event)} />
          </Form.Field>
          <Button type="button" onClick={this.login}>Login</Button>
          <Button type="button" icon='google' onClick={this.googleLogin}></Button>
          <Button type="button" onClick={this.register}>Register</Button>
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
  fbInitUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
