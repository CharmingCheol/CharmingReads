import React from "react";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";

import Homelayout from "../Components/Layout";
import RootReducer from "../redux";
import RootSaga from "../sagas";

const MyApp = ({ Component, store }) => {
  return (
    <Provider store={store}>
      <Homelayout>
        <Component />
      </Homelayout>
    </Provider>
  );
};

const makeStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : compose(
          applyMiddleware(...middlewares),
          !options.isServer &&
            typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f
        );
  const store = createStore(RootReducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(RootSaga);
  return store;
};

export default withRedux(makeStore)(withReduxSaga(MyApp));
