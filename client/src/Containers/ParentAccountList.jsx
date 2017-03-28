import React, { PropTypes } from 'react';
import { Container, Col, Row } from 'reactstrap';

import ParentAccount from '../Components/ParentAccount';
import Account from '../Models/Account';

import './ParentAccountList.css';

function ParentAccountList(props) {
  const accounts = props.parentAccounts;
  const deleteAccount = props.deleteAccount;
  const accountListItems = accounts.map((account) =>
      <Col key={account.accountName} sm="6">
        <div className="list">
        <ParentAccount
          parentAccount={account}
          deleteAccount={deleteAccount}
        />
        </div>
      </Col>,
  );

  return (
    <div className="account-list">
      <h3>Main Accounts</h3>
      <Container>
          <Row>
            {accountListItems}
          </Row>
      </Container>
    </div>
  );
}

ParentAccountList.propTypes = {
  parentAccounts: PropTypes.arrayOf(PropTypes.instanceOf(Account)),
  deleteAccount: PropTypes.func,
};

ParentAccountList.defaultProps = {
  parentAccounts: [],
  deleteAccount: undefined,
};

export default ParentAccountList;
