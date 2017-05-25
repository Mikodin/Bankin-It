/*
* Not my code nor will it be used in the app,
* Solid reference for now though
*/
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty, dataToJS } from 'react-redux-firebase'


export class Todos extends Component {
  static propTypes = {
    todos: PropTypes.object,
    firebase: PropTypes.object
  }

  handleAdd = () => {
    const {newTodo} = this.refs
    const { firebase } = this.props
    console.log(firebase.auth());
    // Add a new todo to firebase
    firebase.push(`/users/${firebase.auth().currentUser.uid}/todos`, { text: newTodo.value, done: false })
    newTodo.value = ''
  }

  render() {
    const { todos } = this.props;
    console.log(todos);

    // Build Todos list if todos exist and are loaded
    const todosList = !isLoaded(todos)
      ? 'Loading'
      : isEmpty(todos)
      ? 'Todo list is empty'
      : Object.keys(todos).map(
        (key, id) => (
          <li key={key} id={id}>{todos[key].id}</li>
        )
      )

    return (
      <div>
        <h1>Todos</h1>
        <ul>
          {todosList}
        </ul>
        <input type="text" ref="newTodo" />
        <button onClick={this.handleAdd}>
          Add
        </button>
      </div>
    )
  }
}

const wrappedTodos = firebaseConnect([
  '/todos'
])(Todos)

export default connect(
  ({firebase}) => ({
    todos: dataToJS(firebase, 'todos'),
  })
)(wrappedTodos)

