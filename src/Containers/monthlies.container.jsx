/* eslint jsx-a11y/img-has-alt: 0 */

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Input, Header } from 'semantic-ui-react';

import { isValidNumberInput } from '../Utilities/inputValidation.utility';
import { updateIncome } from '../Actions/monthly.actions';
import { fbUpdateIncome } from '../Actions/firebase.actions';

import BillCreator from './billCreator.container';
import BillListComp from '../Components/billList.component';

class MonthliesContainer extends Component {
  static propTypes = {
    billsTotal: PropTypes.number,
    incomeAfterBills: PropTypes.number,
    updateIncome: PropTypes.func,
    fbUpdateIncome: PropTypes.func,
    uid: PropTypes.string,
  }

  static defaultProps = {
    billsTotal: 0,
    incomeAfterBills: 0,
    updateIncome: undefined,
    fbUpdateIncome: undefined,
    uid: undefined,
  }

  constructor(props) {
    super(props);

    this.state = {
      income: '',
    };
  }

  componentDidMount() {
    this.incomeInputDOM.focus();
  }

  updateIncome = (event) => {
    const input = event.target.value;
    if (isValidNumberInput(input)) {
      this.setState({ income: input }, () => {
        this.props.updateIncome(this.state.income);
      });

      if (this.props.uid)
        this.props.fbUpdateIncome(this.props.uid, input);
    }
  }

  render() {
    return (
      <div>
        <Header as="h3">Monthlies</Header>
        <Input
          ref={(input) => { this.incomeInputDOM = input; }}
          label="Income"
          placeholder="Monthly Income"
          value={this.props.income}
          onChange={(event) => this.updateIncome(event)} />

        <BillCreator />
        <BillListComp />
        <h3>Bills Total: {this.props.billsTotal}</h3>
        <h3>Income After Bills: {this.props.incomeAfterBills}</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bills: state.userReducer.bills,
    billsTotal: state.userReducer.billsTotal,
    income: state.userReducer.income,
    incomeAfterBills: state.userReducer.incomeAfterBills,
    uid: state.firebaseReducer.user.uid,
  };
};

const mapDispatchToProps = {
  updateIncome,
  fbUpdateIncome,
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthliesContainer);
