import {createStore, combineReducers, applyMiddleware } from 'redux';
import {listingReducer} from './reducers/index';
import Thunk from 'redux-thunk';

const rootReducer = combineReducers({
  listing: listingReducer

})

const store = createStore(rootReducer, applyMiddleware(Thunk));

export default store;