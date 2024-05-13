import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  candidates: [],
  loading: false,
  winner: undefined,
};

const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {
    addCandidate: (state, { payload }) => {
      state.candidates.unshift(payload);
    },
    removeCandidate: (state, { payload }) => {
      state.candidates = state.candidates.filter(
        (item) => item.key !== payload
      );
    },
    getWinnerResult: (state) => {
      if (state.winner) return;
      if (state.candidates.length === 0) return;
      state.winner =
        state.candidates[Math.floor(Math.random() * state.candidates.length)];
      state.candidates = [];
    },
    cleanWinner: (state) => {
      state.winner = undefined;
    },
    cleanCandidates: (state) => {
      state.candidates = [];
    },
  },
});

export const {
  addCandidate,
  removeCandidate,
  getWinnerResult,
  cleanWinner,
  cleanCandidates,
} = candidateSlice.actions;

export default candidateSlice.reducer;

export const candidatesSelector = (state) => state.candidates;

export const winnerSelector = createSelector(
  candidatesSelector,
  (candidates) => candidates.winner
);
