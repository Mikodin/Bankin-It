import {
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  MODIFY_ACCOUNT,
} from '../Actions/types';

const initialState = [];

export default function accountsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ACCOUNT:
      return state.concat(action.payload);

    case DELETE_ACCOUNT:
      return state.filter(account => account.id !== action.payload.id);

    case MODIFY_ACCOUNT:
      return state;

    default:
      return state;
  }
}
