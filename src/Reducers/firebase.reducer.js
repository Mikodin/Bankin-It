import {
  FB_REGISTER,
  FB_LOGIN,
  FB_GOOGLE_LOGIN,
  FB_LOGOUT,
  FB_ADD_BILL,
} from '../Actions/types';

const initialState = {
  user: '',
  email: '',
  bills: [],
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
    default:
      return state;
  }
}
