/* eslint jsx-a11y/img-has-alt: 0 */

import {
  FB_REGISTER,
  FB_LOGIN,
  FB_GOOGLE_LOGIN,
  FB_LOGOUT,
  FB_ADD_BILL,
  FB_ADD_ACCOUNT,
  FB_UPDATE_INCOME,
  FB_GET_BILLS,
} from '../Actions/types';

const initialState = {
  user: '',
  email: '',
  bills: [],
  income: 0,
};

export default function firebaseReducer(state = initialState, action) {
  switch (action.type) {
    case FB_REGISTER: {
      return Object.assign({}, state, { user: action.payload });
    }
    case FB_GOOGLE_LOGIN: {
      return Object.assign({}, state, { user: action.payload });
    }
    case FB_LOGIN: {
      return Object.assign({}, state, { user: action.payload });
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
    default:
      return state;
  }
}
