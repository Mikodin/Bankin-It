/* eslint jsx-a11y/img-has-alt: 0 */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Sidebar, Button, Menu, Icon } from 'semantic-ui-react';

import { logout, fbFullSave } from '../Actions/firebase.actions';
import LoginContainer from './login.container';

class HeaderContainer extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func,
  };

  static defaultProps = {
    user: {},
    logout: undefined,
  };

  constructor(props) {
    super(props);

    this.state = {
      loginVisibile: false,
    };
  }

  logout = () => {
    this.props.logout();
  }

  toggleLogin = () => this.setState({ loginVisibile: !this.state.loginVisibile })

  fullSave = () => {
    this.props.fbFullSave(this.props.user.uid);
  }

  render() {
    const loginCont = this.state.loginVisibile
      ? <LoginContainer toggleVisible={this.toggleLogin} />
      : undefined;
    const loginLogoutButton = this.props.user.uid
      ? (
        <Menu.Item name="logout">
          <Button onClick={this.logout}>Logout</Button>
        </Menu.Item>
      )
      : (
        <Menu.Item name="login">
          <Button onClick={this.toggleLogin}>Login</Button>
        </Menu.Item>
      );

    return (
      <div>
        <Sidebar as={Menu} direction="top" visible>
          <Menu.Item name="home">
            <Icon name="travel" />
            The Stache
            </Menu.Item>
          {loginLogoutButton}
          <Menu.Item name="save">
            <Button onClick={this.toggleLogin}>Save</Button>
          </Menu.Item>
          <Menu.Item name="fullSave">
            <Button onClick={this.fullSave}>FullSave</Button>
          </Menu.Item>
        </Sidebar>
        {loginCont}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.firebaseReducer.user,
  };
};

const mapDispatchToProps = {
  logout,
  fbFullSave,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)(HeaderContainer);

