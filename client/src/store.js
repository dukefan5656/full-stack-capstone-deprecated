import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  listingReducer,
  currentUserReducer,
  bidReducer,
  userReducer
} from "./reducers/index";
import Thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  entities: combineReducers({
    listings: listingReducer,
    users: userReducer,
    bids: bidReducer
  })
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(Thunk))
);

export default store;

