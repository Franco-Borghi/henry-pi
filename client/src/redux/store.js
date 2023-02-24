import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from './reducers/index';
import ThunkMiddleware from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(ThunkMiddleware))
);

export default store;

