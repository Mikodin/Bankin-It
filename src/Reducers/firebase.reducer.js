/* eslint jsx-a11y/img-has-alt: 0 */

import {
  FB_RESET_STATE,
  FB_REGISTER,
  FB_LOGIN,
  FB_LOGIN_SUCCESS,
  FB_LOGIN_FAIL,
  FB_GOOGLE_LOGIN,
  FB_LOGOUT,
  FB_ADD_BILL,
  FB_ADD_ACCOUNT,
  FB_UPDATE_INCOME,
  FB_GET_BILLS,
  FB_INIT_USER,
  FB_INIT_USER_SUCCESS,
  FB_INIT_USER_ERROR,
} from '../Actions/types';

const initialState = {
  user: {},
  email: '',
  bills: [],
  income: 0,
  error: '',
  fetchingData: false,
};

export default function firebaseReducer(state = initialState, action) {
  switch (action.type) {
    case FB_RESET_STATE: {
      return Object.assign({}, initialState);
    }
    case FB_REGISTER: {
      return Object.assign({}, state, { user: action.payload });
    }
    case FB_GOOGLE_LOGIN: {
      return Object.assign({}, state, { user: action.payload });
    }
    case FB_LOGIN: {
      const { fetchingData } = action.payload;
      return Object.assign({}, state, { error: '', fetchingData });
    }
    case FB_LOGIN_SUCCESS: {
      const { user } = action.payload;
      return Object.assign({}, state, {
        user,
        error: '',
        fetchingData: false,
      });
    }
    case FB_LOGIN_FAIL: {
      const { error } = action.payload;
      return Object.assign({}, state, {
        error,
        fetchingData: false,
      });
    }
    case FB_LOGOUT: {
      return initialState;
    }
    case FB_ADD_BILL: {
      return Object.assign({}, state, { bills: action.payload });
    }
    case FB_ADD_ACCOUNT: {
      return Object.assign({}, state, { accounts: action.payload });
    }
    case FB_UPDATE_INCOME: {
      return Object.assign({}, state, { income: action.payload });
    }
    case FB_GET_BILLS: {
      return Object.assign({}, state, { bills: action.payload });
    }
    case FB_INIT_USER: {
      const { fetchingData } = action.payload;
      return Object.assign({}, state, {
        fetchingData,
      });
    }
    case FB_INIT_USER_SUCCESS: {
      const { fetchingData } = action.payload;
      return Object.assign({}, state, {
        fetchingData,
      });
    }
    case FB_INIT_USER_ERROR: {
      const { error } = action.payload;
      return Object.assign({}, state, {
        error,
        fetchingData: false,
      });
    }
    default:
      return state;
  }
}
