import React, { Component } from 'react';

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    }
  }

  componentDidMount() {
    this.setState({value: this.props.value});
  }

  handleValueChange = (e) => {
    this.setState({value: e.target.value});
    this.props.handleValueChange(e.target.value);
  }

  render() {
    return (
      <input value={this.state.value}
        onChange={this.handleValueChange} />
    )
  }
}

export default Input;
