import * as actions from "../actions";

export const loginReducer = (
  state = { user: null, email: null, type: null }, action ) => {
  
  switch (action.type) {
    case actions.LOG_IN_SUCCESS:
      const { user, email, type } = action;
      return Object.assign({}, state, {
        user,
        email,
        type
      });
  }
  return state;
};

export const messageReducer = (state = null, action) => {
  if (action.message !== undefined) {
    return action.message;
  }
  return state;
};

//not sure if action.payload._id should be in an array, consider editing if errors
export const bidReducer = (state = {}, action) => {
  console.log("this is the bidReducer", action.payload.listing._id);
  switch(action.type) {
    case "ADD_BID_SUCCESS":
    return {...state, [action.payload._id]: action.payload};
    break;
    case 'GET_LISTING_SUCCESS':
    return {...state, [action.payload._id]: action.payload};
    break;
    default: 
      return state;
  }
}
//es6
export const listingReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_LISTING_SUCCESS":
      /*
      const newState = { ...state };
      newState[action.payload.id] = action;
      return newState;
      */
     console.log(action);
      return { ...state, [action.payload._id]: action.payload };
      break;
    case 'GET_LISTING_SUCCESS':
      //action.payload = {}

      return { ...state, [action.payload._id]: action.payload };
      return Object.assign({}, state, {
        lists: [...state.lists, {
            title: action.title,
        }]
      });
      
    case 'DELETE_LISTING_SUCCESS':
    return state.filter(({ id }) => id !== action.id);
    
    case 'GET_SELLER_PAYLOAD_SUCCESS':
    //[{-id: id, bla: bla}, {_id: id}]
    
      const listingMap = action.payload.listings.reduce((map, listing) => {
        return { ...map, [listing._id]: listing }
      }, {});
      return {...state, ...listingMap};
      // {id: { _id: id, bla: bla}, id: {_id: id} }
    //   const map = {};
    //   for (const listing of action.payload.listings){
    //     map[listing._id] = listing;
    //   }

    //   const newState = { ...state };
    //   for (const listing of action.payload.listings){
    //     newState[listing._id] = listing;
    //   }
    //   return newState;

    //   //return { ...state,  }
    default:
      return state;
  }
};
