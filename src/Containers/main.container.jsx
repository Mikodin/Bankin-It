import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Icon } from 'semantic-ui-react';

import Todos from './todos.container';
import Login from './login.container';
import MonthliesContainer from './monthlies.container';
import AccountsContainer from './accounts.container';

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillMount() {
  }

  render() {
    const header =
      (
        <Header as="h1" icon>
          <Icon name="money" />
          Bankin-It
          <Header.Subheader>
            The sum is more than just the parts of the whole
          </Header.Subheader>
          <Header.Subheader>
            Or some other cheesy quote
          </Header.Subheader>
        </Header>
      );

    return (
      <Container>
        <Todos />
        <Login />
        {header}
        <MonthliesContainer />
        <AccountsContainer />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accounts: state.userReducer.accounts,
  };
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)(MainContainer);
