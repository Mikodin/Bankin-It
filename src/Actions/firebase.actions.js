/* eslint jsx-a11y/img-has-alt: 0 */
import * as firebase from 'firebase';

import Account from '../Models/account.model';
import Bill from '../Models/bill.model';

import {
  FB_RESET_STATE,
  FB_REGISTER,
  FB_LOGIN,
  FB_LOGIN_SUCCESS,
  FB_LOGIN_FAIL,
  FB_GOOGLE_LOGIN,
  FB_LOGOUT,
  FB_ADD_BILL,
  FB_DELETE_BILL,
  FB_ADD_ACCOUNT,
  FB_DELETE_ACCOUNT,
  FB_UPDATE_INCOME,
  FB_GET_BILLS,
  FB_GET_INCOME,
  FB_GET_ACCOUNTS,
  FB_INIT_USER,
  FB_INIT_USER_SUCCESS,
  FB_FULL_SAVE,
} from './types';

import { addBill } from './bill.actions';
import { addAccount } from './account.actions';
import { updateIncome } from './monthly.actions';
import { userResetState } from './user.actions';

export const fbResetState = () =>
  ({
    type: FB_RESET_STATE,
    payload: true,
  });

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
      dispatch({ type: FB_LOGIN, payload: { fetchingData: true } });
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          dispatch(fbResetState());
          dispatch({ type: FB_LOGIN_SUCCESS, payload: { user } });
          resolve(user);
        })
        .catch((error) => {
          dispatch({ type: FB_LOGIN_FAIL, payload: { error } });
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

export const fbDeleteBill = (uid, billFbKey) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      firebase.database().ref().child(`users/${uid}/bills/${billFbKey}`).remove()
        .then(() => {
          dispatch({
            type: FB_DELETE_BILL,
            payload: true,
          });
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

export const fbAddAccount = (uid, account) => {
  console.log(account);
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

/*
  TODO: Create a delete account and child accounts action
  This works but it doesn't truly delete it's nested accounts (In FB).
  Those accounts just won't get displayed or placed in the Redux store bc
    their parents cannot be found
*/
export const fbDeleteAccount = (uid, accountFbKey) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      firebase.database().ref()
        .child(`users/${uid}/accounts/${accountFbKey}`).remove()
        .then(() => {
          dispatch({
            type: FB_DELETE_ACCOUNT,
            payload: true,
          });
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

export const fbUpdateIncome = (uid, income) => {
  console.log(uid);
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
      dispatch({ type: FB_INIT_USER, payload: { fetchingData: true } });
      dispatch(userResetState());

      dispatch(fbGetBills(uid))
        .then((bills) => {
          if (bills)
            Object.keys(bills).map((key) => {
              const { id, name, amount } = bills[key];
              const billToAdd = new Bill(name, amount, key);
              billToAdd.id = id;
              return dispatch(addBill(billToAdd));
            });

          dispatch(fbGetAccounts(uid))
            .then((accounts) => {
              if (accounts) {
                const structuredAccounts = Object.keys(accounts).map((key) => {
                  const {
                    id,
                    name,
                    parentId,
                    percentageOfParent,
                  } = accounts[key];

                  const accToAdd =
                    new Account(name, 0, percentageOfParent, parentId, key);
                  accToAdd.id = id;
                  
                  return accToAdd;
                });

                const noParentId = structuredAccounts.filter((acc) => {
                  return !acc.parentId;
                });

                const hasParentId = structuredAccounts.filter((acc) => {
                  return acc.parentId;
                });

                const reOrdered = [...noParentId, ...hasParentId];
                console.log(reOrdered);
                console.log(structuredAccounts);


                structuredAccounts.map((accToAdd) => {
                  return dispatch(addAccount(accToAdd));
                });
              }

              dispatch(fbGetIncome(uid))
                .then((income) => {
                  if (income)
                    dispatch(updateIncome(income.income));
                  dispatch({
                    type: FB_INIT_USER_SUCCESS,
                    payload: { fetchingData: false },
                  });
                  resolve(true);
                })
                .catch(error => reject(error));
            })
            .catch(error => reject(error));
        })
        .catch(error => reject(error));
    });
  };
};

function flattenAccounts(flattened, accounts) {
  return accounts.map((account) => {
    const flattenedAccount = Object.assign({}, account, {
      amount: account.amount,
      id: account.id,
      name: account.name,
      parentId: account.parentId,
      percent: account.percent,
      percentageOfParent: account.percentageOfParent,
    });

    flattened.push(flattenedAccount);
    console.log(flattened);

    if (account.childAccounts.length >= 1)
      flattenAccounts(flattened, account.childAccounts);


    return flattened;
  });
}

export const fbFullSave = (uid) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const { income, accounts, bills } = getState().userReducer;
      dispatch(fbUpdateIncome(uid, income));
      bills.map(bill => dispatch(fbAddBill(uid, bill)));

      const flattenedAccounts = flattenAccounts([], accounts);
      flattenedAccounts[0].map(account => {
        dispatch(fbAddAccount(uid, account));
      });

      resolve(true);
    });
  };
};
