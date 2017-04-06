import { CALCULATE_TOTAL } from '../Actions/types.js';

export default function(state = 0, action) {
  switch (action.type) {
    case CALCULATE_TOTAL:
      const bills = action.payload;
      let total = 0;

      for (let i = 0; i < bills.length; i++) {
        total += +bills[i].amount;
      }
      return total;

    default:
      return state;
  }
}
