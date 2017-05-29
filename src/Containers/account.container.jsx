
/* eslint jsx-a11y/img-has-alt: 0 */

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { Button } from 'semantic-ui-react';

import AccountList from '../Components/accountList.component';
import AccountCreator from '../Containers/accountCreator.container';

class AccountContainer extends Component {
  static propTypes = {
    account: PropTypes.object,
    deleteAccount: PropTypes.func,
  }

  static defaultProps = {
    account: {},
    deleteAccount: undefined,
  }

  constructor(props) {
    super(props);

    this.state = {
      showCreator: false,
    };
  }

  toggleCreator = () => {
    this.setState({
      showCreator: !this.state.showCreator,
    });
  }

  render() {
    const { account, deleteAccount } = this.props;
    return (
      <div>
        <h3>ID: {account.id} Name: {account.name}</h3>
        <p>Amount: {account.amount}</p>
        <Button onClick={() => deleteAccount(account.id)}> Delete</Button>
        <Button onClick={() => this.toggleCreator()}>Add Child Account</Button>
        {
          this.state.showCreator
            ? <AccountCreator
              parentAccount={account}
            />
            : undefined
        }
        <AccountList
          accounts={account.childAccounts}
          deleteAccount={this.props.deleteAccount}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
