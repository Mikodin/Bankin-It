import React, { Component, PropTypes } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { connect } from 'react-redux';

import Bill from '../Models/Bill';
import { addBill } from '../Actions/addBill.action';
import { deleteBill } from '../Actions/deleteBill.action';
import { calculateTotal } from '../Actions/calculateTotal.action';

class BillCreator extends Component {
  static propTypes = {
    calculateTotal: PropTypes.func,
    updateIncomeAfterBills: PropTypes.func,
    addBill: PropTypes.func,
    deleteBill: PropTypes.func,
    bills: PropTypes.arrayOf(PropTypes.instanceOf(Bill)),
  }
  static defaultProps = {
    addBill: undefined,
    deleteBill: undefined,
    bills: [],
    calculateTotal: undefined,
    updateIncomeAfterBills: undefined,
  }
  constructor(props) {
    super(props);

    this.state = {
      billName: '',
      billAmount: '',
    };
  }

  addBill = (event) => {
    event.preventDefault();
    const bill = new Bill(this.state.billName, this.state.billAmount);
    this.addBillPromise(bill)
      .then(() => {
        this.props.calculateTotal(this.props.bills);
        this.props.updateIncomeAfterBills();
      });
  }

  addBillPromise(bill) {
    return new Promise((resolve, reject) => {
      if (!bill) reject(false);

      this.props.addBill(bill);
      resolve(true);
    });
  }

  deleteBill = () => {
    this.props.deleteBill(this.state.billName);
  }

  render() {
    const { billName, billAmount } = this.state;

    return (
      <div>
        <Form>
          <FormGroup row>
            <Label for="billName" sm={2}>Bill Name</Label>
            <Col sm={6}>
              <Input
                id="billName"
                name="billName"
                type="text"
                value={billName}
                placeholder="Enter a unique bill name"
                onChange={(event) =>
                    this.setState({ billName: event.target.value })} />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="billAmount" sm={2}>Bill Amount</Label>
                <Col sm={6}>
                  <Input
                    id="billAmount"
                    name="billAmount"
                    type="text"
                    inputMode="numeric"
                    value={billAmount}
                    placeholder="Enter the bill amount"
                    onChange={(event) =>
                        this.setState({ billAmount: event.target.value })} />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col sm={{ size: 6, push: 2, pull: 2, offset: 4 }}>
                      <Button color="primary" onClick={this.addBill}>
                        Add bill
                      </Button>
                    </Col>
                  </FormGroup>

                </Form>
              </div>
    );
  }
}

const mapStateToProps = (state) => ({ bills: state.bills });

export default connect(mapStateToProps,
  { addBill, deleteBill, calculateTotal })(BillCreator);
