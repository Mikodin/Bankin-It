import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Input, Button, Form } from 'semantic-ui-react';

import { googleLogin, login, logout, register } from '../Actions/firebase.actions';

class Login extends Component {
  static propTypes = {
  }

  static defaultProps = {
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
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    uid: state.firebaseReducer.uid,
  };
};

const mapDispatchToProps = {
  login,
  googleLogin,
  logout,
  register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
