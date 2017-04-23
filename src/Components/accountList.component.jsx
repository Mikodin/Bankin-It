import React from 'react';
import { PropTypes } from 'prop-types';

import '../styles.css';
import Account from '../Models/account.model';
import AccountComp from '../Components/account.component';

export default function AccountListComp(props) {
  const accountList =
    props.accounts.map(account => {
      return (
        <li key={account.id}>
          <AccountComp
            account={account}
            deleteAccount={props.deleteAccount}
          />
        </li>
      );
    });

  return (
    <div>
      <ul>
        {accountList}
      </ul>
    </div>
  );
}

AccountListComp.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.instanceOf(Account)),
  deleteAccount: PropTypes.func,
};

AccountListComp.defaultProps = {
  accounts: [],
  deleteAccount: undefined,
};
