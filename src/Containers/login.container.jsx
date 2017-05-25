import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Input, Button, Form } from 'semantic-ui-react';
import { firebaseConnect } from 'react-redux-firebase';

class Login extends Component {
  static propTypes = {
    firebase: PropTypes.object,
  }

  static defaultProps = {
    firebase: {},
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

    this.props.firebase.login(user)
      .then((uid) => {
        console.log(JSON.stringify(uid));
        console.log(this.props.firebase.auth().currentUser);
      })
      .catch((error) => console.error(error));
  }

  createUser = () => {
    const { email, password } = this.state;
    const user = { email, password };

    this.props.firebase.createUser(user, user)
      .then((data) => {
        console.log('Registered');
        console.log(data);
      })
      .catch((error) => console.error(error));
  }

  googleLogin = () => {
    this.props.firebase.login({
      provider: 'google',
      type: 'popup',
    })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  render() {
    return (
      <div style={{marginTop: '55px'}}>
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
          <Button type="button" onClick={this.createUser}>Register</Button>
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
};

export default firebaseConnect(mapStateToProps, mapDispatchToProps)(Login);
