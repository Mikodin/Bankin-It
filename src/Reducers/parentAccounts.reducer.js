import {
  ADD_PARENT_ACCOUNT,
  DELETE_PARENT_ACCOUNT,
  MODIFY_PARENT_ACCOUNT,
} from '../Actions/types';

const initialState = [];

export default function monthlyReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PARENT_ACCOUNT:
      return state.concat(action.payload);

    case DELETE_PARENT_ACCOUNT:
      return state.filter(account => account.id !== action.payload.id);

    case MODIFY_PARENT_ACCOUNT:
      return state;

    default:
      return state;
  }
}
