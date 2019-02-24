import * as actions from '../actions';

const initialState = {
  id: null,
  username: null,
  type: null
};

export default (state=initialState, action) => {
  switch((action.type)){
    case actions.LOG_IN_SUCCESS:
      const {id, username, type} = action;
      return 
        Object.assign({}, state, {
          id,
          username,
          type
        })
  }
  return state;
}

const messageReducer = (state=null, action) => {
  if(action.message !== undefined){
    return action.message;
  }
  return state;
}