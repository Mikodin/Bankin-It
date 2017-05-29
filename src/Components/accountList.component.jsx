/* eslint jsx-a11y/img-has-alt: 0 */

import React from 'react';
import { PropTypes } from 'prop-types';

import '../styles.css';
import AccountComp from '../Components/account.component';

export default function AccountListComp(props) {
  const accountList =
    props.accounts.map(account => {
      return account.id !== 'DELETE'
        ? (
          <li key={account.id}>
            <AccountComp
              account={account}
              deleteAccount={props.deleteAccount}
            />
          </li>
        )
        : undefined;
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
  accounts: PropTypes.arrayOf(PropTypes.object),
  deleteAccount: PropTypes.func,
};

AccountListComp.defaultProps = {
  accounts: [],
  deleteAccount: undefined,
};
