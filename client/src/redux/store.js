import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { alertsSlice } from "./alertsSlice";
import { userSlice } from "./userSlice";

// The combineReducers() function is a Redux utility that combines multiple reducers into a single reducer.
// combineReducers is a function that accepts an object full of slice reducers as its argument, and returns a function that you can pass to createStore.
// The resulting reducer calls every child reducer, and gathers their results into a single state object.
// The state produced by combineReducers() namespaces the states of each reducer under their keys as passed to combineReducers().

const rootReducer = combineReducers({
  alerts: alertsSlice.reducer,
  user: userSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
