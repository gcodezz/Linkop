import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import * as serviceWorker from './serviceWorker'

import App from './App'
import authReducer from './store/reducers/auth'
import dataReducer from './store/reducers/data'
import uiReducer from './store/reducers/ui'
import userReducer from './store/reducers/user'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  data: dataReducer,
  UI: uiReducer,
})

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
))

const app = (
  <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
