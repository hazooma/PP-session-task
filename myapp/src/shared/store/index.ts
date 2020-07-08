import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import * as actions from "../rootActions";
import reducers, { RootState } from "../rootReducer";

export type RootStateType = RootState;

// Create store
function configureStore() {
  // configure middlewares
  const middlewares = [thunk];
  // compose enhancers
  const enhancer = compose(applyMiddleware(...middlewares));
  // create store
  return createStore(reducers, {}, enhancer);
}

const store = configureStore();

export { store, actions };
