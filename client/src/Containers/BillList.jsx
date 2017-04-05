import React, { Component, PropTypes } from 'react';
import { Col, Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle,
  ListGroup, ListGroupItem } from 'reactstrap';

import Bill from '../Models/Bill';

// import './BillList.css';

class BillList extends Component {
  static propTypes = {
    bills: PropTypes.arrayOf(PropTypes.instanceOf(Bill)),
  };

  static defaultProps = {
    bills: [],
    deleteBill: undefined,
  };
  constructor(props) {
    super(props);
  }

  render() {
    const bills = this.props.bills;
    // const deleteAccount = props.deleteAccount;
    const billListItems = bills.map((bill) => {
      return (
        <ListGroupItem key={bill.name}>
          <CardText>{bill.name}</CardText>
        </ListGroupItem>
      );
    });

    let total = 0;
    for (let i = 0; i < bills.length; i++)
      total += +bills[i].amount;

    return (
      <div>
        <Card>
          <CardTitle>Bills</CardTitle>
          <CardBlock>
            <ListGroup>
              {billListItems} 
            </ListGroup>
          </CardBlock>
          <p>Total: {total}</p>
        </Card>
      </div>
    );
  }

}
export default BillList;

