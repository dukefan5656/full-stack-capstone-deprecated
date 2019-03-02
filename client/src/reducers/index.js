import * as actions from "../actions";

export const loginReducer = (
  state = { id: null, username: null, type: null }, action ) => {
  const initialState = {
    id: null,
    username: null,
    type: null
  };

  switch (action.type) {
    case actions.LOG_IN_SUCCESS:
      const { id, username, type } = action;
      return;
      Object.assign({}, state, {
        id,
        username,
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

//es6
export const listingReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_LISTING_SUCCESS":
      /*
      const newState = { ...state };
      newState[action.payload.id] = action;
      return newState;
      */
      return { ...state, [action.payload._id]: action.payload };
      break;
    case 'GET_LISTING_SUCCESS':
      //action.payload = {}

      return { ...state, [action.payload._id]: action.payload };
    
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
