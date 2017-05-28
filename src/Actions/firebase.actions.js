/* eslint jsx-a11y/img-has-alt: 0 */

import * as firebase from 'firebase';

import {
  FB_REGISTER,
  FB_LOGIN,
  FB_GOOGLE_LOGIN,
  FB_LOGOUT,
  FB_ADD_BILL,
  FB_ADD_ACCOUNT,
  FB_UPDATE_INCOME,
  FB_GET_BILLS,
} from './types';


export const register = ({ email, password }) => {
  return dispatch => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch({
          type: FB_REGISTER,
          payload: user,
        });
      })
      .catch((error) => {
        dispatch({
          type: FB_REGISTER,
          payload: error,
        });
      });
  };
};

export const login = ({ email, password }) => {
  return dispatch => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch({
          type: FB_LOGIN,
          payload: user,
        });
      })
      .catch((error) => {
        dispatch({
          type: FB_LOGIN,
          payload: error,
        });
      });
  };
};

export const googleLogin = () => {
  return dispatch => {
    // Using a popup.
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then((result) => {
      // const token = result.credential.accessToken;
      const user = result.user;
      dispatch({
        type: FB_GOOGLE_LOGIN,
        payload: user,
      });
    })
      .catch((error) => {
        dispatch({
          type: FB_GOOGLE_LOGIN,
          payload: error,
        });
      });
  };
};

export const logout = () => {
  return dispatch => {
    firebase.auth().signOut()
      .then(() => {
        dispatch({
          type: FB_LOGOUT,
          payload: true,
        });
      })
      .catch((error) => {
        dispatch({
          type: FB_LOGOUT,
          payload: error,
        });
      });
  };
};

export const fbAddBill = (uid, bill) => {
  return dispatch => {
    const billsRef = firebase.database().ref().child(`users/${uid}/bills`);
    billsRef.push(bill)
    .then((data) => {
      dispatch({
        type: FB_ADD_BILL,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FB_ADD_BILL,
        payload: error,
      });
    });
  };
};

export const fbAddAccount = (uid, account) => {
  return dispatch => {
    const accountsRef = firebase.database().ref().child(`users/${uid}/accounts`);
    accountsRef.push(account)
    .then((data) => {
      dispatch({
        type: FB_ADD_ACCOUNT,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FB_ADD_ACCOUNT,
        payload: error,
      });
    });
  };
};

export const fbUpdateIncome = (uid, income) => {
  return dispatch => {
    const accountsRef = firebase.database().ref().child(`users/${uid}/income`);
    accountsRef.set({ income })
    .then((data) => {
      dispatch({
        type: FB_UPDATE_INCOME,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FB_UPDATE_INCOME,
        payload: error,
      });
    });
  };
};

export const fbGetBills = (uid) => {
  return dispatch => {
    firebase.database().ref().child(`users/${uid}/bills`).once('value')
      .then((snapshot) => {
        console.log(snapshot);
        dispatch({
          type: FB_GET_BILLS,
          payload: snapshot,
        });
      });
  };
};

/*
export const fbGetBills = (uid) => {
  return new Promise((resolve, reject) => {
    return dispatch => {
      firebase.database().ref().child(`users/${uid}/bills`).once('value')
        .then((snapshot) => {
          console.log(snapshot);
          resolve(snapshot);
          dispatch({
            type: FB_GET_BILLS,
            payload: snapshot,
          });
        });
    };

  });
};
*/
