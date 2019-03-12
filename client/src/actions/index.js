import history from "../history";
import { Listing, User, Bid } from "../schema";
import { normalize } from "normalizr";

const signupSuccess = json => {
  return dispatch => {
    dispatch({
      type: SIGN_UP_SUCCESS,
      user: json.user._id,
      email: json.user.local.email,
      userType: json.user.type
    });
    history.push("/profile");
  };
};

const signupFailure = error => {
  return { type: LOG_IN_FAILURE, message: error };
};

export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const signup = (email, password, type) => {
  return dispatch => {
    dispatch({ type: SIGN_UP_SUCCESS, email });
    return fetch(`http://localhost:8080/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        type
      })
    })
      .then(res => {
        if (res.url === "http://localhost:8080/seller_profile") {
          return res.json();
        } else {
          throw new Error("invalid login");
        }
      })
      .then(json => dispatch(signupSuccess(json)))
      .catch(error => dispatch(signupFailure(error)));
  };
};

export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const logIn = (email, password) => {
  return dispatch => {
    dispatch({ type: LOG_IN_REQUEST, email });
    return fetch(`http://localhost:8080/login`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(res => {
        if (res.url === "http://localhost:8080/seller_profile") {
          return res.json();
        } else {
          throw new Error("invalid login");
        }
      })
      .then(json => dispatch(logInSuccess(json)))
      .catch(error => dispatch(logInFailure(error)));
  };
};

const logInSuccess = json => {
  return dispatch => {
    dispatch({
      type: LOG_IN_SUCCESS,
      user: json.user._id,
      email: json.user.local.email,
      userType: json.user.type
    });
    history.push("/profile");
  };
};

const logInFailure = error => {
  return { type: LOG_IN_FAILURE, message: error };
};

export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";

const ADD_BID_SUCCESS = "ADD_BID_SUCCESS";
const addBidSuccess = json => {
  const bidResult = normalize(json, Bid);
  return { type: ADD_BID_SUCCESS, id: json._id, entities: bidResult.entities };
};

const ADD_BID_FAILURE = "ADD_BID_FAILURE";
const addBidFailure = error => {
  return { type: ADD_BID_FAILURE, message: error };
};
export const ADD_BID_REQUEST = "ADD_BID_REQUEST";
export const addBid = (amount, id) => dispatch => {
  dispatch({ type: ADD_BID_REQUEST });
  return fetch("http://localhost:8080/createBid/" + id, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ amount, id })
  })
    .then(res => {
      if (res.headers.get("Content-Type").includes("application/json")) {
        if (res.ok) {
          return res.json();
        }
        return res.json().then(json => {
          throw Error("API: " + JSON.stringify(json));
        });
      }
      return res.text().then(text => {
        throw Error("HTTP " + res.status + " : " + text);
      });
    })
    .then(json => dispatch(addBidSuccess(json)))
    .catch(error => dispatch(addBidFailure(error)));
};

const ADD_LISTING_SUCCESS = "ADD_LISTING_SUCCESS";
const addListingSuccess = json => {
  const listingResult = normalize(json, Listing);
  return {
    type: ADD_LISTING_SUCCESS,
    id: json._id,
    entities: listingResult.entities
  };
};

const ADD_LISTING_FAILURE = "ADD_LISTING_FAILURE";
const addListingFailure = error => {
  console.log(error);
  return { type: ADD_LISTING_FAILURE, message: error };
};
export const ADD_LISTING_REQUEST = "ADD_LISTING_REQUEST";
export const addListing = args => dispatch => {
  dispatch({ type: ADD_LISTING_REQUEST });

  return (
    fetch("http://localhost:8080/createListing", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(args)
    })
      .then(res => {
        if (res.headers.get("Content-Type").includes("application/json")) {
          if (res.ok) {
            return res.json();
          }

          return res.json().then(json => {
            throw Error("API: " + JSON.stringify(json));
          });
        }

        return res.text().then(text => {
          throw Error("HTTP " + res.status + " : " + text);
        });
      })
      .then(json => dispatch(addListingSuccess(json)))
      //    .then(json => dispatch(addListingSuccess(json, args)))
      .catch(error => dispatch(addListingFailure(error)))
  );
};

const UPDATE_BID_SUCCESS = "UPDATE_BID_SUCCESS";
const updateBidSuccess = json => {
  const bidResults = normalize(json, Bid);
  return { type: UPDATE_BID_SUCCESS, entities: bidResults.entities };
};

const UPDATE_BID_FAILURE = "UPDATE_BID_FAILURE";
const updateBidFailure = error => {
  return { type: UPDATE_BID_FAILURE, message: error };
};

export const UPDATE_BID_REQUEST = "UPDATE_BID_REQUEST";
export const updateBid = (id, status) => dispatch => {
  dispatch({ type: UPDATE_BID_REQUEST });
  return (
    fetch("http://localhost:8080/updateBid", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, status })
    })
      .then(res => {
        if (res.headers.get("Content-Type").includes("application/json")) {
          if (res.ok) {
            return res.json();
          }

          return res.json().then(json => {
            throw Error("API: " + JSON.stringify(json));
          });
        }

        return res.text().then(text => {
          throw Error("HTTP " + res.status + " : " + text);
        });
      })
      .then(json => dispatch(updateBidSuccess(json)))
      //    .then(json => dispatch(addListingSuccess(json, args)))
      .catch(error => dispatch(updateBidFailure(error)))
  );
};

const GET_AGENT_PAYLOAD_SUCCESS = "GET_AGENT_PAYLOAD_SUCCESS";
const getAgentPayloadSuccess = json => {
  const bidResults = normalize(json.user, User);
  return { type: GET_AGENT_PAYLOAD_SUCCESS, entities: bidResults.entities };
};

const GET_AGENT_PAYLOAD_FAILURE = "GET_AGENT_PAYLOAD_FAILURE";
const getAgentPayloadFailure = error => {
  return { type: GET_AGENT_PAYLOAD_FAILURE, message: error };
};

const GET_AGENT_PAYLOAD_REQUEST = "GET_AGENT_PAYLOAD_REQUEST";
export const getAgentPayload = () => dispatch => {
  dispatch({ type: GET_AGENT_PAYLOAD_REQUEST });

  return fetch(`http://localhost:8080/agent_profile`, {
    method: "GET",
    credentials: "include"
  })
    .then(res => {
      if (res.headers.get("Content-Type").includes("application/json")) {
        if (res.ok) {
          return res.json();
        }

        return res.json().then(json => {
          throw Error("API: " + JSON.stringify(json));
        });
      }

      return res.text().then(text => {
        throw Error("HTTP " + res.status + " : " + text);
      });
    })
    .then(json => dispatch(getAgentPayloadSuccess(json)))
    .catch(error => dispatch(getAgentPayloadFailure(error)));
};

const GET_SELLER_PAYLOAD_SUCCESS = "GET_SELLER_PAYLOAD_SUCCESS";
const getSellerPayloadSuccess = json => {
  const listingResults = normalize(json.user, User);
  return {
    type: GET_SELLER_PAYLOAD_SUCCESS,
    entities: listingResults.entities
  };
};

const GET_SELLER_PAYLOAD_FAILURE = "GET_SELLER_PAYLOAD_FAILURE";
const getSellerPayloadFailure = error => {
  return { type: GET_SELLER_PAYLOAD_FAILURE, message: error };
};

const GET_SELLER_PAYLOAD_REQUEST = "GET_SELLER_PAYLOAD_REQUEST";
export const getSellerPayload = () => dispatch => {
  dispatch({ type: GET_SELLER_PAYLOAD_REQUEST });

  return fetch(`http://localhost:8080/seller_profile`, {
    method: "GET",
    credentials: "include"
  })
    .then(res => {
      if (res.headers.get("Content-Type").includes("application/json")) {
        if (res.ok) {
          return res.json();
        }

        return res.json().then(json => {
          throw Error("API: " + JSON.stringify(json));
        });
      }

      return res.text().then(text => {
        throw Error("HTTP " + res.status + " : " + text);
      });
    })
    .then(json => dispatch(getSellerPayloadSuccess(json)))
    .catch(error => dispatch(getSellerPayloadFailure(error)));
};

const GET_LISTING_SUCCESS = "GET_LISTING_SUCCESS";

const getListingSuccess = json => {
  const listingResults = normalize(json.listing, Listing);
  return { type: GET_LISTING_SUCCESS, entities: listingResults.entities };
};

const GET_LISTING_FAILURE = "GET_LISTING_FAILURE";
const getListingFailure = error => {
  return { type: GET_LISTING_FAILURE, message: error };
};

export const GET_LISTING_REQUEST = "GET_LISTING_REQUEST";
export const getListing = id => dispatch => {
  dispatch({ type: GET_LISTING_REQUEST, id });
  return fetch(`http://localhost:8080/listing/` + id, {
    method: "GET",
    credentials: "include"
  })
    .then(res => {
      if (res.headers.get("Content-Type").includes("application/json")) {
        if (res.ok) {
          return res.json();
        }

        return res.json().then(json => {
          throw Error("API: " + JSON.stringify(json));
        });
      }

      return res.text().then(text => {
        throw Error("HTTP " + res.status + " : " + text);
      });
    })
    .then(json => dispatch(getListingSuccess(json)))
    .catch(error => dispatch(getListingFailure(error)));
};

const DELETE_LISTING_SUCCESS = "DELETE_LISTING_SUCCESS";
const deleteListingSuccess = id => {
  return {
    type: DELETE_LISTING_SUCCESS,
    id
  };
};

const DELETE_LISTING_FAILURE = "DELETE_LISTING_FAILURE";
const deleteListingFailure = error => {
  return { type: DELETE_LISTING_FAILURE, message: error };
};

export const DELETE_LISTING_REQUEST = "DELETE_LISTING_REQUEST";
export const deleteListing = id => dispatch => {
  dispatch({ type: DELETE_LISTING_REQUEST, id });
  return fetch(`http://localhost:8080/listings/${id}`, {
    method: "DELETE",
    credentials: "include"
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(json => dispatch(deleteListingSuccess(json.id)))
    .catch(error => dispatch(deleteListingFailure(error)));
};
