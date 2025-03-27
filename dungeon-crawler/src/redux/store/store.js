import { createStore } from "redux";

const initialState = {};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// Create store
const store = createStore(reducer);

export default store;
