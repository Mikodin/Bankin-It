import React, { Component } from 'react';

class SomeTextBox extends Component {
  constructor(props) {
    super(props);

    this.state = { someNumber: 0 };
  }

  render() {
    return (
      <div className="some-textbox">
        <input
          value = {this.state.someNumber}
          onChange = {event => this.onInputChange(event.target.value)} />
      </div>
    );
  }

  onInputChange(someNumber) {
    this.setState({someNumber});
  }
}

export default SomeTextBox;


