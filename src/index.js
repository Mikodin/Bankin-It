/* eslint jsx-a11y/img-has-alt: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css';
import * as firebase from 'firebase';


import App from './App';
import { FB_CREDS } from './firebaseConfig';

import { rootReducer } from './Reducers/index';

firebase.initializeApp(FB_CREDS);

// eslint-disable-next-line no-underscore-dangle, no-undef
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
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
