import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// redux
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'; // SAGA
import rootReducers from './redux/reducers';
import rootSagas from './redux/effects';

import 'bootstrap/dist/css/bootstrap.css';

import App from './App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

let store = createStore(rootReducers, {}, composeEnhancers(applyMiddleware(sagaMiddleware)));

// run the saga
sagaMiddleware.run(rootSagas);

ReactDOM.render(

    <Provider store={store}>
        <App />
    </Provider>

    , document.getElementById('root'));
registerServiceWorker();
