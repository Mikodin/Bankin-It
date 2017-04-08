import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Card,
  CardText,
  CardBlock,
  ListGroup,
  ListGroupItem,
  Button } from 'reactstrap';

import './BillList.css';
import Bill from '../Models/Bill';
import { calculateTotal } from '../Actions/calculateTotal.action';
import { deleteBill } from '../Actions/deleteBill.action';

class BillList extends Component {
  constructor(props) {
    super(props);
  }

  deleteBillUpdateTotal= (bill) => {
    this.deleteBillPromise(bill)
      .then(() => {
        this.props.calculateTotal(this.props.bills);
      });
  }

  deleteBillPromise(bill) {
    return new Promise((resolve, reject) => {
      if (!bill) reject(false);
      this.props.deleteBill(bill.name);
      resolve(true);
    });
  }

  render() {
    const bills = this.props.bills;
    const billListItems = bills.map((bill) =>
        (
          <ListGroupItem key={bill.name}>
            <CardText>{bill.name}: ${bill.amount}</CardText>
            <Button onClick={() => this.deleteBillUpdateTotal(bill)}>Delete</Button>
          </ListGroupItem>
        ),
    );

    return (
      <div>
        <h2>Bills</h2>
        <Card>
          <CardBlock>
            <ListGroup className="bill-list">
              {billListItems}
            </ListGroup>
          </CardBlock>
          <h3>Total: {this.props.total}</h3>
        </Card>
      </div>
    );
  }
}

BillList.propTypes = {
  bills: PropTypes.arrayOf(PropTypes.instanceOf(Bill)),
  total: PropTypes.number,
  deleteBill: PropTypes.func,
  calculateTotal: PropTypes.func,
};

BillList.defaultProps = {
  bills: [],
  deleteBill: undefined,
  total: 0,
  calculateTotal: undefined,
};

const mapStateToProps = (state) => ({ bills: state.bills, total: state.total });
export default connect(mapStateToProps, { calculateTotal, deleteBill })(BillList);
