import {createStore, combineReducers, applyMiddleware } from 'redux';
import {listingReducer, loginReducer, } from './reducers/index';
import Thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const rootReducer = combineReducers({
  listing: listingReducer,
  user: loginReducer

})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(Thunk))
);

export default store;