import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import '../styles.css';
import Bill from '../Models/bill.model';
import { deleteBill, modifyBill } from '../Actions/bill.actions';

class BillList extends Component {
  static propTypes = {
    bills: PropTypes.arrayOf(PropTypes.instanceOf(Bill)),
    deleteBill: PropTypes.func,
  }

  static defaultProps = {
    bills: [],
    deleteBill: undefined,
  }

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const billList =
      this.props.bills.map(bill => {
        return (
          <li key={bill.id}>
            <h3>{bill.name}</h3>
            <h3>{bill.amount}</h3>
            <Button
              onClick={() => this.props.deleteBill(bill)}>
              Delete Bill
            </Button>
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
}

const mapStateToProps = (state) => {
  return {
    bills: state.bills,
  };
};

const mapDispatchToProps = {
  deleteBill,
  modifyBill,
};

export default connect(mapStateToProps, mapDispatchToProps)(BillList);
