import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import "materialize-css/dist/css/materialize.min.css"; //if relative path is not provided it assumes to specifying a module

import reduxThunk from 'redux-thunk';

import App from "./components/App";
import reducers from "./reducers";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk)); //store is an instance of createStore...
//arrow function is a dummy reducer to return an array
//{} to present the initial state of the application

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  //provider is uded for glueing and wiring it up
  document.querySelector("#root")
);

console.log('Stripe key is', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is', process.env.NODE_ENV);
//render the App constant inside the body named root inside the body directory
