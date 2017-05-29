import { USER_RESET_STATE } from './types';

export const userResetState = () =>
  ({
    type: USER_RESET_STATE,
    payload: true,
  });
