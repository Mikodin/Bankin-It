import React, { Component } from 'react';

/* Functional(Dumb) Component! Has no idea what is happening TO it
 * Returns plain jsx that's it.  Cannot speak to other components
const SearchBar = () => {
  return <input />;
};
*/

/*
 * Class based component
 * Only these have state
 * State: A plain javascript object which is used to record and react to user
 * events, each class based component has it's own state object, whenever
 * a component state object is changed the component immediately re-renders and
 * also causes it's children components to re-render
 */
class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }
  // { } inside the jsx aka the render method is the escape char :)
  render() {
    return (
      <div className="search-bar">
        <input 
          value = {this.state.term}
          onChange = {event => this.onInputChange(event.target.value)} />
        </div>
    );
  }

  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }

}

export default SearchBar;
