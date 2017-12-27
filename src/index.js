import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'; // SAGA
import rootReducers from './redux/reducers';
import rootSagas from './redux/effects';

import App from './App';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

let store = createStore(rootReducers, {}, applyMiddleware(sagaMiddleware));

// run the saga
sagaMiddleware.run(rootSagas);

ReactDOM.render(

    <Provider store={store}>
        <App />
    </Provider>

    , document.getElementById('root'));
registerServiceWorker();
