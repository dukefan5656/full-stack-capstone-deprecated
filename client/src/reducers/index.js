import * as actions from "../actions";

export const currentUserReducer = (
  state = { user: null, email: null, userType: null },
  action
) => {
  switch (action.type) {
    case actions.LOG_IN_SUCCESS:
      const { user, email, userType } = action;
      return Object.assign({}, state, {
        user,
        email,
        userType
      });
  }
  return state;
};

export const signupReducer = (
  state = { user: null, email: null, type: null },
  action
) => {
  switch (action.type) {
    case actions.SIGN_UP_SUCCESS:
      const { user, email, type } = action;
      return Object.assign({}, state, {
        user,
        email,
        type
      });
  }
  return state;
};

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_LISTING_SUCCESS":
      const listing = action.entities.listings[action.id];
      const user = state[listing.user];
      const updatedUser = { ...user };
      updatedUser.listings = [...user.listings, listing._id];
      return { ...state, [user._id]: updatedUser };

    case "GET_LISTING_SUCCESS":
      return { ...state, ...action.entities.users };
    case "GET_AGENT_PAYLOAD_SUCCESS":
      return { ...state, ...action.entities.users };
    case "GET_SELLER_PAYLOAD_SUCCESS":
      return { ...state, ...action.entities.users };
    default:
      return state;
  }
};

export const bidReducer = (state = {}, action) => {
  //making edits to Add Bid with normalize old: return {...state, [action.bid._id]: action.bid};
  switch (action.type) {
    case "ADD_BID_SUCCESS":
      return { ...state, ...action.entities.bids };
    case "GET_SELLER_PAYLOAD_SUCCESS":
      return { ...state, ...action.entities.bids };
    case "GET_AGENT_PAYLOAD_SUCCESS":
      return { ...state, ...action.entities.bids };
    case "GET_LISTING_SUCCESS":
      return { ...state, ...action.entities.bids };
    case "UPDATE_BID_SUCCESS":
      return { ...state, ...action.entities.bids };
    default:
      return state;
  }
};
//es6
//editing Add listing success for normalize old: return { ...state, [action.payload._id]: action.payload };
export const listingReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_LISTING_SUCCESS":
      return { ...state, ...action.entities.listings };
    case "GET_LISTING_SUCCESS":

      return { ...state, ...action.entities.listings };
    case "GET_AGENT_PAYLOAD_SUCCESS":

      return { ...state, ...action.entities.listings };

    case "GET_SELLER_PAYLOAD_SUCCESS":

      return { ...state, ...action.entities.listings };
    case "ADD_BID_SUCCESS":
      const bid = action.entities.bids[action.id];
      const listing = state[bid.listing];

      return {
        ...state,
        [bid.listing]: { ...listing, bid: [...listing.bids, bid._id] }
      };

    case "DELETE_LISTING_SUCCESS":
      return { ...state, ...state.filter(({ id }) => id !== action.id) };
    default:
      return state;
  }
};
