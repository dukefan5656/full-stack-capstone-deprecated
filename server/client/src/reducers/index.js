import * as actions from "../actions";


const initialCurrentUser = { user: null, email: null, userType: null };
export const currentUserReducer = (state = initialCurrentUser, action) => {
  switch (action.type) {
    case actions.SIGN_UP_SUCCESS:
    case actions.LOG_IN_SUCCESS:
      const { user, email, userType } = action;
      return Object.assign({}, state, {
        user,
        email,
        userType
      });
    case actions.LOG_OUT_SUCCESS:
      return initialCurrentUser;
    default:
      return state;
  }
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
      case "DELETE_BID_SUCCESS":
      return Object.values(state).reduce((newState, user) => {
        const newUser = {...user, bids : user.bids.filter(bidId => bidId !== action.id)}
        newState[newUser._id] = newUser;
        return newState;
      }, {});
      case "DELETE_LISTING_SUCCESS":
      return Object.values(state).reduce((newState, user) => {
        const newUser = {...user}
        if(newUser.listings !== undefined){
          newUser.listings = newUser.listings.filter(listingId => listingId !== action.id);
        }
        newState[newUser._id] = newUser;
        return newState;
      }, {}); 
    
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
    case "DELETE_BID_SUCCESS":
    let copiedState = Object.assign({}, state) 
    delete copiedState[action.id]; 
    return copiedState;
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
        [bid.listing]: { ...listing, bids: [...listing.bids, bid._id] }
      };
      case "DELETE_BID_SUCCESS":
      return Object.values(state).reduce((newState, listing) => {
        const newListing = {...listing, bids : listing.bids.filter(bidId => bidId !== action.id)}
        newState[newListing._id] = newListing;
        return newState;
      }, {});
      
    case "DELETE_LISTING_SUCCESS":
      let copiedState = Object.assign({}, state) 
      delete copiedState[action.id]; 
      return copiedState;
    default:
      return state;
  }
};
