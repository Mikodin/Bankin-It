import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Icon } from 'semantic-ui-react';

import HeaderContainer from './header.container';
import { Todos } from './todos.container';
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
      <div>
        <HeaderContainer />
        <Container style={{ paddingTop: '50px' }}>
          {header}
          <Todos />
          <MonthliesContainer />
          <AccountsContainer />
        </Container>
      </div>
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
