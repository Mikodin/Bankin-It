/* eslint jsx-a11y/img-has-alt: 0 */

import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Button, Table, Checkbox, Icon } from 'semantic-ui-react';

import '../styles.css';
import './billList.css';

import { deleteBill, modifyBill } from '../Actions/bill.actions';
import { fbDeleteBill } from '../Actions/firebase.actions';

function removeBill(props, bill) {
  const { id, fbKey } = bill;
  props.deleteBill(id);
  if (props.uid) props.fbDeleteBill(props.uid, fbKey);
}

function BillListComp(props) {
  const billList =
    props.bills.map(bill => {
      return (
        <Table.Row key={bill.id}>
          <Table.Cell collapsing>
            <Checkbox />
          </Table.Cell>
          <Table.Cell>{bill.name}</Table.Cell>
          <Table.Cell>{bill.amount}</Table.Cell>
          <Table.Cell>
            <Button
              color="red"
              animated="vertical"
              onClick={() => { removeBill(props, bill); }}>
              <Button.Content hidden>Delete</Button.Content>
              <Button.Content visible>
                <Icon name="trash" />
              </Button.Content>
            </Button>
            <Button
              color="yellow"
              animated="vertical">
              <Button.Content hidden>Edit</Button.Content>
              <Button.Content visible>
                <Icon name="pencil" />
              </Button.Content>
            </Button>
          </Table.Cell>
        </Table.Row>
      );
    });

  return (
    <div >
      <Table compact sortable stackable striped singleLine size="small" definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body className="bill-cont">
          {billList}
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell>
              <Button size="small">Select All</Button>
            </Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell>Total: {props.billsTotal}</Table.HeaderCell>
            <Table.HeaderCell>
              <Button icon color="red" size="small">
                <Icon name="trash" /> Delete Selected
            </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
}

BillListComp.propTypes = {
  bills: PropTypes.arrayOf(PropTypes.object),
  billsTotal: PropTypes.number,
};

BillListComp.defaultProps = {
  bills: [],
  billsTotal: 0,
};

const mapStateToProps = (state) => {
  return {
    bills: state.userReducer.bills,
    billsTotal: state.userReducer.billsTotal,
    uid: state.firebaseReducer.user.uid,
  };
};

const mapDispatchToProps = {
  deleteBill,
  modifyBill,
  fbDeleteBill,
};

export default connect(mapStateToProps, mapDispatchToProps)(BillListComp);
