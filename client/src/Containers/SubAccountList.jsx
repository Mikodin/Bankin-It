import React, { PropTypes } from 'react';

import ParentAccount from '../Components/ParentAccount';
import Account from '../Models/Account';

function SubAccountList(props) {
  const accounts = props.subAccounts;
  const accountListItems = accounts.map((account) =>
      <li key={account.accountName}>
        <ParentAccount parentAccount={account} />
      </li>,
  );

  return (
    <div>
      <ul>{accountListItems}</ul>
    </div>
  );
}

export default SubAccountList;

SubAccountList.propTypes = {
  subAccounts: PropTypes.arrayOf(PropTypes.instanceOf(Account)),
};

SubAccountList.defaultProps = {
  subAccounts: [],
};
