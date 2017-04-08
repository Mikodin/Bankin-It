import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Card, CardText, CardBlock, ListGroup, ListGroupItem } from 'reactstrap';

import './BillList.css';
import Bill from '../Models/Bill';
import { calculateTotal } from '../Actions/calculateTotal.action';

// import './BillList.css';

class BillList extends Component {
  static propTypes = {
    bills: PropTypes.arrayOf(PropTypes.instanceOf(Bill)),
    total: PropTypes.number,
  };

  static defaultProps = {
    bills: [],
    deleteBill: undefined,
    total: 0,
  };
  constructor(props) {
    super(props);
  }

  render() {
    const bills = this.props.bills;
    const billListItems = bills.map((bill) =>
      (
        <ListGroupItem key={bill.name}>
          <CardText>{bill.name}: ${bill.amount}</CardText>
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

const mapStateToProps = (state) => ({ total: state.total });
export default connect(mapStateToProps, { calculateTotal })(BillList);
