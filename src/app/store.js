import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import navigationReducer from './navigationSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    navigation: navigationReducer,
  },
});
