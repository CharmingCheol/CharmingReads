import React from "react";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import { Container } from "next/app";
import axios from "axios";

import RootReducer from "../redux";
import RootSaga from "../sagas";
import { LOAD_USER_REQUEST } from "../redux/actions/userAction";
import Homelayout from "../Components/Layout";

const MyApp = ({ Component, store, pageProps }) => {
  return (
    <Container>
      <Provider store={store}>
        <Homelayout>
          <Component {...pageProps} />
        </Homelayout>
      </Provider>
    </Container>
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

MyApp.getInitialProps = async context => {
  const { ctx, Component } = context;
  let pageProps = {};
  const state = ctx.store.getState();
  const cookie = ctx.isServer ? ctx.req.headers.cookie : "";
  if (ctx.isServer) {
    axios.defaults.headers.Cookie = "";
  }
  if (ctx.isServer && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  if (!state.userReducer.me) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST
    });
  }
  if (Component.getInitialProps) {
    pageProps = (await Component.getInitialProps(ctx)) || {};
  }
  return { pageProps };
};

export default withRedux(makeStore)(withReduxSaga(MyApp));
