import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

import Account from '../Models/account.model';
import AccountCreator from './accountCreator.container';
import AccountListComp from '../Components/accountList.component';
import { deleteAccount, modifyAccount } from '../Actions/account.actions';

class AccountsContainer extends Component {
  static propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.instanceOf(Account)),
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
    return (
      <div>
        <Header as="h3">Accounts</Header>
        <AccountCreator />
        <AccountListComp
          accounts={this.props.accounts}
          deleteAccount={this.props.deleteAccount}
          modifyAccount={this.props.modifyAccount}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
  };
};

const mapDispatchToProps = {
  deleteAccount,
  modifyAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountsContainer);
