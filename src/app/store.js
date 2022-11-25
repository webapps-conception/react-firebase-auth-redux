import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../actions/user';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
