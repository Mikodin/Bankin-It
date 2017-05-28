/* eslint jsx-a11y/img-has-alt: 0 */

import React from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'semantic-ui-react';

import Account from '../Models/account.model';
import AccountList from './accountList.component';
import AccountCreator from '../Containers/accountCreator.container';

export default function AccountComp(props) {
  const { account, deleteAccount } = props;

  return (
    <div>
      <h3>ID: {account.id} Name: {account.name}</h3>
      <p>Amount: {account.amount}</p>
      <Button onClick={() => deleteAccount(account.id)}>
        Delete
      </Button>
      <AccountCreator
        parentAccount={account}
      />
      <AccountList
        accounts={account.childAccounts}
        deleteAccount={props.deleteAccount}
      />
    </div>
  );
}

AccountComp.propTypes = {
  account: PropTypes.instanceOf(Account),
  deleteAccount: PropTypes.func,
};

AccountComp.defaultProps = {
  account: {},
  deleteAccount: undefined,
};
