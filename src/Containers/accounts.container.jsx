/* eslint jsx-a11y/img-has-alt: 0 */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Header, Grid } from 'semantic-ui-react';

import AccountCreator from './accountCreator.container';
import AccountContainer from './account.container';
import { deleteAccount, modifyAccount } from '../Actions/account.actions';

class AccountsContainer extends Component {
  static propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.object),
    modifyAccount: PropTypes.func,
    deleteAccount: PropTypes.func,
  }

  static defaultProps = {
    accounts: [],
    modifyAccount: undefined,
    deleteAccount: undefined,
  }

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const parentAccounts = this.props.accounts.map((account) => {
      return (
        <Grid.Column key={account.id}>
          <AccountContainer
            account={account}
            deleteAccount={this.props.deleteAccount}
          />
        </Grid.Column>
      );
    });
    return (
      <div>
        <Header as="h3">Accounts</Header>
        <AccountCreator />
        <Grid doubling stackable container columns={2}>
          <Grid.Row>
            {parentAccounts}
          </Grid.Row>
        </Grid>
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
  deleteAccount,
  modifyAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountsContainer);
