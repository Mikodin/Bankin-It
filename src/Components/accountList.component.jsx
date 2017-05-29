/* eslint jsx-a11y/img-has-alt: 0 */

import React from 'react';
import { PropTypes } from 'prop-types';

import '../styles.css';
import AccountContainer from '../Containers/account.container';

export default function AccountListComp(props) {
  const accountList =
    props.accounts.map(account => {
      return (
        <li key={account.id}>
          <AccountContainer
            account={account}
            deleteAccount={props.deleteAccount}
          />
        </li>
      );
    });

  return (
    <ul>
      {accountList}
    </ul>
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
