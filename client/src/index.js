import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import appReducer from './reducers/index';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import Thunk from 'redux-thunk';


const store = createStore(appReducer, applyMiddleware(Thunk)
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
