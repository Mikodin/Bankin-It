import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Col, Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle,
  ListGroup, ListGroupItem } from 'reactstrap';

import Bill from '../Models/Bill';
import { calculateTotal } from '../Actions/calculateTotal.action';

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
    const billListItems = bills.map((bill) => {
      return (
        <ListGroupItem key={bill.name}>
          <CardText>{bill.name}</CardText>
        </ListGroupItem>
      );
    });

    return (
      <div>
        <Card>
          <CardTitle>Bills</CardTitle>
          <CardBlock>
            <ListGroup>
              {billListItems} 
            </ListGroup>
          </CardBlock>
          <p>Total: {this.props.total}</p>
        </Card>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({ total: state.total });
export default connect(mapStateToProps, { calculateTotal })(BillList);
