import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Input, Button, Form } from 'semantic-ui-react';

import Bill from '../Models/bill.model';
import { isValidNumberInput } from '../Utilities/inputValidation.utility';
import { addBill, deleteBill, modifyBill } from '../Actions/bill.actions';

class BillCreator extends Component {
  static propTypes = {
    addBill: PropTypes.func,
  }

  static defaultProps = {
    addBill: undefined,
  }

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      amount: '',
    };
  }

  updateName = (event) => {
    const name = event.target.value;
    this.setState({ name });
  }

  updateAmount = (event) => {
    const amount = event.target.value;

    if (isValidNumberInput(event.target.value))
      this.setState({ amount });
  }

  addBill = (event) => {
    event.preventDefault();
    const bill = new Bill(this.state.name, this.state.amount);
    this.props.addBill(bill);
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <Input
              label="Bill Name"
              placeholder="Bill Name"
              value={this.state.name}
              onChange={(event) => this.updateName(event)} />
          </Form.Field>
          <Form.Field>
            <Input
              label="Bill Amount"
              placeholder="Bill Amount"
              value={this.state.amount}
              onChange={(event) => this.updateAmount(event)} />
          </Form.Field>
          <Button type="submit" onClick={this.addBill}>Add Bill</Button>
        </Form>
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
  addBill,
  deleteBill,
  modifyBill,
};

export default connect(mapStateToProps, mapDispatchToProps)(BillCreator);
