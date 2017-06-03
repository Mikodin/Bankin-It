/* eslint jsx-a11y/img-has-alt: 0 */

import React from 'react';
import { PropTypes } from 'prop-types';

import './billList.css';

import { connect } from 'react-redux';
import { Button, Card, Grid } from 'semantic-ui-react';

import '../styles.css';
import { deleteBill, modifyBill } from '../Actions/bill.actions';

function BillListComp(props) {
  const billList =
    props.bills.map(bill => {
      return (
        <Grid.Column key={bill.id} style={{marginTop: '10px'}}>
          <Card color="red" fluid raised>
            <Card.Content>
              <Card.Header>{bill.name}</Card.Header>
              <Card.Meta>${bill.amount}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <Button
                fluid
                onClick={() => props.deleteBill(bill.id)}
                basic
                color="red">
                Delete Bill
          </Button>
              <Button
                fluid
                basic
                color="yellow">
                Modify Bill
            </Button>
            </Card.Content>
          </Card>
        </Grid.Column>
      );
    });

  return (
    <div className="bill-cont">
      <Grid
        container
        doubling
        stackable
        columns={4}
        padded
         >
        <Grid.Row>
          {billList}
        </Grid.Row>
      </Grid>
    </div>
  );
}

BillListComp.propTypes = {
  bills: PropTypes.arrayOf(PropTypes.object),
};

BillListComp.defaultProps = {
  bills: [],
};

const mapStateToProps = (state) => {
  return {
    bills: state.userReducer.bills,
  };
};

const mapDispatchToProps = {
  deleteBill,
  modifyBill,
};

export default connect(mapStateToProps, mapDispatchToProps)(BillListComp);
