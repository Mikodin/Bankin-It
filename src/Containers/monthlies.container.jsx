import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Input, Header } from 'semantic-ui-react';

import { isValidNumberInput } from '../Utilities/inputValidation.utility';
import { updateIncome } from '../Actions/monthly.actions';

import BillCreator from './billCreator.container';
import BillList from './billList.container';

class MonthliesContainer extends Component {
  static propTypes = {
    monthlies: PropTypes.object,
    updateIncome: PropTypes.func,
  }

  static defaultProps = {
    monthlies: {},
    updateIncome: undefined,
  }

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  updateIncome = (event) => {
    if (isValidNumberInput(event.target.value))
      this.props.updateIncome(event.target.value);
  }

  render() {
    return (
      <div>
        <Header as="h3">Monthlies</Header>
        <Input
          label="Income"
          value={this.props.monthlies.income}
          onChange={(event) => this.updateIncome(event)} />

        <BillCreator />
        <BillList />
        <h3>Bills Total: {this.props.monthlies.billsTotal}</h3>
        <h3>Income After Bills: {this.props.monthlies.incomeAfterBills}</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bills: state.bills,
    monthlies: state.monthlies,
  };
};

const mapDispatchToProps = {
  updateIncome,
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthliesContainer);
