import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import allReducer from "./reducers";
import { Provider } from "react-redux";
import reportWebVitals from './reportWebVitals';

// ** Redux, Thunk & Root Reducer Imports
import thunk from 'redux-thunk'
import createDebounce from 'redux-debounced'
import { createStore, applyMiddleware, compose } from 'redux'

// ** init middleware
const middleware = [thunk, createDebounce()]

// ** Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// ** Create store
const store = createStore(allReducer, {}, composeEnhancers(applyMiddleware(...middleware)))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
