import { createSlice } from "@reduxjs/toolkit";

// createSlice is a function that accepts an initial state, an object full of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.
// The slice name is used as the first part of the action type, and is also used to namespace the generated action creators.
// The slice name is also used to namespace the generated action creators.
// reducers is an object of reducer functions that we want to generate action creators for.

// alertSlice is a slice of the Redux store that contains the state of the alerts.
export const alertsSlice = createSlice({
  name: "alerts",
  initialState: {
    loading: false,
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { showLoading, hideLoading } = alertsSlice.actions;
