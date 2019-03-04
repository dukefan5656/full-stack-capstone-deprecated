import {createStore, combineReducers, applyMiddleware } from 'redux';
import {listingReducer} from './reducers/index';
import Thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const rootReducer = combineReducers({
  listing: listingReducer

})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(Thunk))
);

export default store;