import {API_BASE_URL} from '../config/api';

export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const logIn = (email, password) => {
  return dispatch => {
    dispatch({ type: LOG_IN_SUCCESS, email });
    console.log('test');
    return fetch(`/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email, 
        password
      })
    })
    .then(res => { 
      if(res.headers.get('Content-Type').includes('application/json')){
        if(res.ok){
          return res.json();
        }

        return res.json().then(json => {
          throw Error('API: ' + JSON.stringify(json));
        });
      }

      return res.text().then(text => {
        throw Error('HTTP ' + res.status + ' : ' + text);
      })
     })
     .then(json => dispatch(logInSuccess(json)))
     .catch(error => dispatch(logInFailure(error)))
  }
}

const logInSuccess = (json) => {
  const {id, email, userType } = json;
  return { id, email, userType, type: LOG_IN_SUCCESS }
}

const logInFailure = (error) => {
  return {type: LOG_IN_FAILURE, message : error}
}

export const LOG_IN_FAILURE = ''

export const LOG_IN_REQUEST = ''

const ADD_LISTING_SUCCESS = 'ADD_LISTING_SUCCESS';
const addListingSuccess = (json) => {
  return { type: ADD_LISTING_SUCCESS, payload: json.payload }
}

const ADD_LISTING_FAILURE = 'ADD_LISTING_FAILURE';
const addListingFailure = (error) => {
  return {type: ADD_LISTING_FAILURE, message : error}
}
export const ADD_LISTING_REQUEST = 'ADD_LISTING_REQUEST';
export const addListing = (...args) => dispatch => {
  dispatch({ type: ADD_LISTING_REQUEST });

  return fetch('URL', { method: 'POST', body: JSON.stringify(args)})
    .then(res => { 
      if(res.headers.get('Content-Type').includes('application/json')){
        if(res.ok){
          return res.json();
        }

        return res.json().then(json => {
          throw Error('API: ' + JSON.stringify(json));
        });
      }

      return res.text().then(text => {
        throw Error('HTTP ' + res.status + ' : ' + text);
      })
    })
    .then(json => dispatch(addListingSuccess(json)))
//    .then(json => dispatch(addListingSuccess(json, args)))
    .catch(error => dispatch(addListingFailure(error)))
};

const GET_LISTING_SUCCESS = 'GET_LISTING_SUCCESS';
const getListingSuccess = (json) => {
  return { type: GET_LISTING_SUCCESS, payload: json.listing }
};

const GET_LISTING_FAILURE = 'GET_LISTING_FAILURE';
const getListingFailure = (error) => {
  return {type: GET_LISTING_FAILURE, message : error}
};


const GET_SELLER_PAYLOAD_SUCCESS = 'GET_SELLER_PAYLOAD_SUCCESS';
const getSellerPayloadSuccess = (json) => {
  return { type: GET_SELLER_PAYLOAD_SUCCESS, payload: { user: json.user, listings: json.listings } }
};

const GET_SELLER_PAYLOAD_FAILURE = 'GET_SELLER_PAYLOAD_FAILURE';
const getSellerPayloadFailure = (error) => {
  return {type: GET_SELLER_PAYLOAD_FAILURE, message : error}
};

const GET_SELLER_PAYLOAD_REQUEST = 'GET_SELLER_PAYLOAD_REQUEST';
export const getSellerPayload = () => dispatch => {
  dispatch({ type: GET_SELLER_PAYLOAD_REQUEST });

  return fetch(`http://localhost:8080/seller_profile/`, {method: 'GET'})
    .then(res => { 
      if(res.headers.get('Content-Type').includes('application/json')){
        if(res.ok){
          return res.json();
        }

        return res.json().then(json => {
          throw Error('API: ' + JSON.stringify(json));
        });
      }

      return res.text().then(text => {
        throw Error('HTTP ' + res.status + ' : ' + text);
      })
    })
    .then(json => dispatch(getSellerPayloadSuccess(json)))
    .catch(error => dispatch(getSellerPayloadFailure(error)))
};
export const GET_LISTING_REQUEST = 'GET_LISTING_REQUEST';
export const getListing = id => dispatch => {
  dispatch({ type: GET_LISTING_REQUEST, id });
  console.log("fetch request:", id);
  return fetch(`http://localhost:8080/listing/` + id, {method: 'GET'})
    .then(res => { 
      if(res.headers.get('Content-Type').includes('application/json')){
        if(res.ok){
          return res.json();
        }

        return res.json().then(json => {
          throw Error('API: ' + JSON.stringify(json));
        });
      }

      return res.text().then(text => {
        throw Error('HTTP ' + res.status + ' : ' + text);
      })
    })
    .then(json => dispatch(getListingSuccess(json)))
    .catch(error => dispatch(getListingFailure(error)))
};


