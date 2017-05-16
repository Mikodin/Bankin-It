import React from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import '../styles.css';
import Bill from '../Models/bill.model';
import { deleteBill, modifyBill } from '../Actions/bill.actions';

function BillListComp(props) {
  const billList =
    props.bills.map(bill => {
      return (
        <li key={bill.id}>
          <h3>{bill.name}</h3>
          <h3>{bill.amount}</h3>
          <Button
            onClick={() => props.deleteBill(bill.id)}>
            Delete Bill
          </Button>
          <Button>Modify Bill</Button>
        </li>
      );
    });

  return (
    <div>
      <ul className="billList">
        {billList}
      </ul>
    </div>
  );
}

BillListComp.propTypes = {
  bills: PropTypes.arrayOf(PropTypes.instanceOf(Bill)),
};

BillListComp.defaultProps = {
  bills: [],
};

const mapStateToProps = (state) => {
  return {
    bills: state.bills,
  };
};

const mapDispatchToProps = {
  deleteBill,
  modifyBill,
};

export default connect(mapStateToProps, mapDispatchToProps)(BillListComp);
