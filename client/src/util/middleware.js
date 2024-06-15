import { clearCart } from './cartSlice';
import { logoutUser } from './userSlice';

const clearCartOnLogout = store => next => action => {
  if (action.type === logoutUser.type) {
    store.dispatch(clearCart());
  }
  return next(action);
};

export default clearCartOnLogout;
