import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Input, Header } from 'semantic-ui-react';

import { isValidNumberInput } from '../Utilities/inputValidation.utility';
import { updateIncome } from '../Actions/monthly.actions';

import BillCreator from './billCreator.container';
import BillListComp from '../Components/billList.component';

class MonthliesContainer extends Component {
  static propTypes = {
    billsTotal: PropTypes.number,
    incomeAfterBills: PropTypes.number,
    updateIncome: PropTypes.func,
  }

  static defaultProps = {
    billsTotal: 0,
    incomeAfterBills: 0,
    updateIncome: undefined,
  }

  constructor(props) {
    super(props);

    this.state = {
      income: '',
    };
  }

  updateIncome = (event) => {
    const input = event.target.value;
    if (isValidNumberInput(input)) {
      this.setState({ income: input }, () => {
        this.props.updateIncome(this.state.income);
      });
    }
  }

  render() {
    return (
      <div>
        <Header as="h3">Monthlies</Header>
        <Input
          label="Income"
          placeholder="Monthly Income"
          value={this.state.income}
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
    bills: state.bills,
    billsTotal: state.billsTotal,
    income: state.income,
    incomeAfterBills: state.incomeAfterBills,
  };
};

const mapDispatchToProps = {
  updateIncome,
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthliesContainer);
