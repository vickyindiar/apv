import React from 'react';
import ReactDOM from 'react-dom';
import { compose, applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import App from './App/index';
import * as serviceWorker from './serviceWorker';
import '../node_modules/font-awesome/scss/font-awesome.scss';
import layoutReducer from './store/reducers/layoutReducer';
import authReducer from './store/reducers/authReducer';
import apvReducer from './store/reducers/apvReducer';
import ntfReducer from './store/reducers/ntfReducer';
import dashReducer from './store/reducers/dashReducer';

// import {reduxFirestore, getFirestore} from 'redux-firestore';
// import {reactReduxFirebase, getFirebase} from 'react-redux-firebase';
// import { initFirebase } from './store/actions/ntfAction';

const reducers = combineReducers({ //todo
    layout: layoutReducer, 
    auth: authReducer, 
    apv: apvReducer,
    ntf: ntfReducer,
    dash: dashReducer
}); 
//const store = createStore(reducers, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

const store = createStore(reducers,
                             compose(
                                   applyMiddleware(thunk /*.withExtraArgument({getFirebase, getFirestore}) */ ), //withExtraArgument({getFirebase, getFirestore}) for firebase & firestore can access from action,  
                                  // reduxFirestore(initFirebase), 
                                  // reactReduxFirebase(initFirebase) 
                                )
                        );

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
 serviceWorker.unregister();

//initFirebase();
//serviceWorker.register();
