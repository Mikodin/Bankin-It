/* eslint jsx-a11y/img-has-alt: 0 */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, Icon } from 'semantic-ui-react';

import Bill from '../Models/bill.model';
import { isValidNumberInput } from '../Utilities/inputValidation.utility';
import { addBill, deleteBill, modifyBill } from '../Actions/bill.actions';
import { fbAddBill } from '../Actions/firebase.actions';

class BillCreator extends Component {
  static propTypes = {
    addBill: PropTypes.func,
    fbAddBill: PropTypes.func,
    uid: PropTypes.string,
  }

  static defaultProps = {
    addBill: undefined,
    fbAddBill: undefined,
    uid: undefined,
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

    if (this.props.uid)
      this.props.fbAddBill(this.props.uid, bill);

    this.props.addBill(bill);
    this.setState({
      name: '',
      amount: '',
    });

    // eslint-disable-next-line no-undef
    const billNameInput = document.querySelector('input[name="billNameInput"]');
    billNameInput.focus();
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <Form.Input
              name="billNameInput"
              label="Bill Name"
              placeholder="Bill Name"
              value={this.state.name}
              onChange={(event) => this.updateName(event)} />
          </Form.Field>
          <Form.Field>
            <Form.Input
              label="Bill Amount"
              placeholder="Bill Amount"
              value={this.state.amount}
              onChange={(event) => this.updateAmount(event)} />
          </Form.Field>
          <Button primary animated onClick={this.addBill}>
            <Button.Content visible>Add Bill</Button.Content>
            <Button.Content hidden>
              <Icon name="plus" />
              Add
            </Button.Content>
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bills: state.userReducer.bills,
    uid: state.firebaseReducer.user.uid,
  };
};

const mapDispatchToProps = {
  addBill,
  deleteBill,
  modifyBill,
  fbAddBill,
};

export default connect(mapStateToProps, mapDispatchToProps)(BillCreator);
