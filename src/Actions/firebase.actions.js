import * as firebase from 'firebase';

import {
  FB_REGISTER,
  FB_LOGIN,
  FB_GOOGLE_LOGIN,
  FB_LOGOUT,
  FB_ADD_BILL,
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
    console.log(`user ${uid} bill: ${JSON.stringify(bill)}`);
    // let messageListRef = firebase.database().ref(`${uid}/bills`);
    let billsRef = firebase.database().ref().child(`users/${uid}/bills`);
    billsRef.push(bill)
    .then((data) => {
      console.log('DATA');
      console.log(data);
      dispatch({
        type: FB_ADD_BILL,
        payload: data,
      });
    })
    .catch((error) => {
      console.log('AB Error');
      console.log(error);
      dispatch({
        type: FB_ADD_BILL,
        payload: error,
      });
    });
  };
};
