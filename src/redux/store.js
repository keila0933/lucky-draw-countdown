import { configureStore } from '@reduxjs/toolkit';

import candidatesReducer from './CandidateSlice';
import CountdownSlice from './CountdownSlice';

export const store = configureStore({
  reducer: {
    candidates: candidatesReducer,
    timer: CountdownSlice,
  },
  middleware: (getDefaultMiddleware) =>  [...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== 'development' ? false : true,
});

export default store;