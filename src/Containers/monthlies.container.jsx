/* eslint jsx-a11y/img-has-alt: 0 */

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Form, Header, Segment, Grid } from 'semantic-ui-react';

import { isValidNumberInput } from '../Utilities/inputValidation.utility';
import { updateIncome } from '../Actions/monthly.actions';
import { fbUpdateIncome } from '../Actions/firebase.actions';

import BillCreator from './billCreator.container';
import BillListComp from '../Components/billList.component';

class MonthliesContainer extends Component {
  static propTypes = {
    billsTotal: PropTypes.number,
    income: PropTypes.number,
    incomeAfterBills: PropTypes.number,
    updateIncome: PropTypes.func,
    fbUpdateIncome: PropTypes.func,
    uid: PropTypes.string,
  }

  static defaultProps = {
    billsTotal: 0,
    income: 0,
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
    // eslint-disable-next-line no-undef
    const incomeInput = document.querySelector('input[name="incomeInput"]');
    incomeInput.focus();
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
      <div className="monthlies">
        <Header as="h3">Monthlies</Header>
        <Grid as={Segment} container doubling stackable columns={2} padded>
            <Grid.Row>
              <Grid.Column width={4}>
            <Form>
              <Form.Field>
                <Form.Input
                  name="incomeInput"
                  label="Income"
                  placeholder="Monthly Income"
                  value={this.props.income}
                  onChange={(event) => this.updateIncome(event)} />
              </Form.Field>
            </Form>
            </Grid.Column>
            </Grid.Row>

            <h3>Monthly Income: {this.props.income}</h3>

            <Grid.Row>
              <Grid.Column width={4}>
                <BillCreator />
                <h3>Bills Total: {this.props.billsTotal}</h3>
                <h3>Income After Bills: {this.props.incomeAfterBills}</h3>
                <h3>Total Percentage Remaining: {this.props.percentRemaining}</h3>
              </Grid.Column>
              <Grid.Column width={12}>
                <BillListComp />
              </Grid.Column>
            </Grid.Row>
          </Grid>
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
    percentRemaining: state.userReducer.percentRemaining,
  };
};

const mapDispatchToProps = {
  updateIncome,
  fbUpdateIncome,
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthliesContainer);
