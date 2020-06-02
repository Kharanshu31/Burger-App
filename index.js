import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore,compose,applyMiddleware,combineReducers} from 'redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducers/burgerBuilder';
import authreducer from "./store/reducers/auth";
import ordereducer from "./store/reducers/order"
import thunk from "redux-thunk";

const composeEnahancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer=combineReducers({
  reducer:reducer,
  order:ordereducer,
  auth:authreducer
})

const store = createStore(rootReducer,composeEnahancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
