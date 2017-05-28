/* eslint jsx-a11y/img-has-alt: 0 */

import React, { Component } from 'react';
import { Sidebar, Button, Menu, Icon } from 'semantic-ui-react';

import Login from './login.container';

class HeaderContainer extends Component {
  state = {
    loginVisibile: false,
  }

  toggleLogin = () => this.setState({ loginVisibile: !this.state.loginVisibile })

  render() {
    const loginCont = this.state.loginVisibile ? <Login /> : null;
    return (
      <div>
          <Sidebar as={Menu} direction="top" visible>
            <Menu.Item name="home">
              <Icon name="travel" />
              The Stache
            </Menu.Item>
            <Menu.Item name="gamepad">
              <Button onClick={this.toggleLogin}>Login</Button>
            </Menu.Item>
            <Menu.Item name="camera">
              <Button onClick={this.toggleLogin}>Save</Button>
            </Menu.Item>
          </Sidebar>
          {loginCont}
      </div>
    );
  }
}

export default HeaderContainer;
