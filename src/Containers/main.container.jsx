import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Icon, Button } from 'semantic-ui-react';

import { addAccount } from '../Actions/account.actions';
import Account from '../Models/account.model';
import MonthliesContainer from './monthlies.container';

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      childAccountToAddToParent1: new Account('child', 50, 10),
      childAccountToAddToChild: new Account('childofChild', 50, 10),
    };
  }

  componentWillMount() {
    this.props.addAccount(new Account('Parent1', 50, 50));
    this.props.addAccount(new Account('Parent2', 50, 50));
    console.log(this.props.accounts);
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

    const logAccounts = 
      (
        <Button
          onClick={() => {console.log(this.props.accounts)}}>
          TESTING: Print Accounts To Console
        </Button>
      )


    const addChildAccount = 
      (
        <Button
          onClick={() => {
            this.props.addAccount(this.state.childAccountToAddToParent1, this.props.accounts[0]);
          }}>
          TESTING: Add Child To Parent
        </Button>
      )
    const addChildToChildAccount = 
      (
        <Button
          onClick={() => {
            this.props.addAccount(this.state.childAccountToAddToChild, this.state.childAccountToAddToParent1);
          }}>
          TESTING: Add Child to Child
        </Button>
      )

    return (
      <Container>
        {header}
        <MonthliesContainer />
        {logAccounts}
        {addChildAccount}
        {addChildToChildAccount}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
  };
};

const mapDispatchToProps = {
  addAccount,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)(MainContainer);
