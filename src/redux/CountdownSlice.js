import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timer: 0,
  isCountdown: false,
  isSetup: false,
};

const CountdownSlice = createSlice({
  name: "countDown",
  initialState,
  reducers: {
    setTimer: (state, { payload }) => {
      state.isSetup = true;
      state.timer = payload;
    },
    runTimer: (state) => {
      state.isCountdown = true;
    },
    clearTimer: (state) => {
      state.isSetup = false;
      state.isCountdown = false;
      state.timer = 0;
    },
    reduceSecond: (state) => {
      state.timer -= 1;
    },
  },
});

export const { setTimer, runTimer, clearTimer, reduceSecond } =
  CountdownSlice.actions;

export default CountdownSlice.reducer;

export const countdownSelector = (state) => state.timer;
