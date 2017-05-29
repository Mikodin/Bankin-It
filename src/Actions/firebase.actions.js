/* eslint jsx-a11y/img-has-alt: 0 */

import * as firebase from 'firebase';

import Account from '../Models/account.model';

import {
  FB_REGISTER,
  FB_LOGIN,
  FB_GOOGLE_LOGIN,
  FB_LOGOUT,
  FB_ADD_BILL,
  FB_ADD_ACCOUNT,
  FB_UPDATE_INCOME,
  FB_GET_BILLS,
  FB_GET_INCOME,
  FB_GET_ACCOUNTS,
  FB_INIT_USER,
} from './types';

import { addBill } from './bill.actions';
import { addAccount } from './account.actions';
import { updateIncome } from './monthly.actions';


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
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          dispatch({
            type: FB_LOGIN,
            payload: user,
          });
          resolve(user);
        })
        .catch((error) => {
          dispatch({
            type: FB_LOGIN,
            payload: error,
          });
          reject(error);
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
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      firebase.database().ref().child(`users/${uid}/bills`).once('value')
        .then((snapshot) => {
          dispatch({
            type: FB_GET_BILLS,
            payload: snapshot.val(),
          });
          resolve(snapshot.val());
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

export const fbGetIncome = (uid) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      firebase.database().ref().child(`users/${uid}/income`).once('value')
        .then((snapshot) => {
          dispatch({
            type: FB_GET_INCOME,
            payload: snapshot.val(),
          });
          resolve(snapshot.val());
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

export const fbGetAccounts = (uid) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      firebase.database().ref().child(`users/${uid}/accounts`).once('value')
        .then((snapshot) => {
          dispatch({
            type: FB_GET_ACCOUNTS,
            payload: snapshot.val(),
          });
          resolve(snapshot.val());
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

export const fbInitUser = (uid) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: FB_INIT_USER,
        payload: true,
      });

      dispatch(fbGetBills(uid))
        .then((bills) => {
          Object.keys(bills).map((key) => {
            return dispatch(addBill(bills[key]));
          });

          dispatch(fbGetAccounts(uid))
            .then((accounts) => {
              Object.keys(accounts).map((key) => {
                const { id, name, parentId, percent, percentageOfParent } = accounts[key];
                const accToAdd = new Account(name, 0, percentageOfParent, parentId);
                accToAdd.id = id;
                accToAdd.percent = percent;
                return dispatch(addAccount(accToAdd));
              });

              dispatch(fbGetIncome(uid))
                .then((income) => {
                  dispatch(updateIncome(income.income));
                })
                .catch(error => reject(error));

              resolve(true);
            })
            .catch(error => reject(error));
        })
        .catch(error => reject(error));
    });
  };
};
