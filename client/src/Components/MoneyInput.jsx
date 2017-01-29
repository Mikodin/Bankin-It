import React, { Component } from 'react';

class MoneyInput extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTotalMoneyChange(e.target.value);
  }

  render() {
    const value = this.props.paycheck;
    return (
      <div className="Bank">
        <fieldset>
          <legend>Enter your paycheck amount</legend>
          <input value={value}
            onChange={this.handleChange} />
        </fieldset>
      </div>
    );
  }
}

export default MoneyInput;
