import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { reactReduxFirebase } from 'react-redux-firebase';

import 'semantic-ui-css/semantic.min.css';

import App from './App';
import { firebaseInfo, extraConfig } from './firebaseConfig';
import { rootReducer } from './Reducers/index';

// eslint-disable-next-line no-underscore-dangle, no-undef
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebaseInfo, extraConfig),
)(createStore);

// Create store with reducers and initial state
const store = createStoreWithFirebase(rootReducer,
  composeEnhancers(
    applyMiddleware(thunk),
  ));

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider
    store={store}>
    <App />
  </Provider>,

  // eslint-disable-next-line no-undef
  document.getElementById('root'));
