import history from "../history";
import { Listing, User, Bid } from "../schema";
import { normalize } from "normalizr";

//#region Signup

export const signupSuccess = json => {
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

export const signupFailure = error => {
  return { type: SIGN_UP_FAILURE, message: error };
};

export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const signup = (email, password, type) => {
  return dispatch => {
    dispatch({ type: SIGN_UP_REQUEST, email, userType: type });
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
        // TODO - Fix check to work for agents
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

//#endregion Signup

//#region Login

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
        // TODO - Fix check to work for agents
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

export const logInSuccess = json => {
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

export const logInFailure = error => {
  return { type: LOG_IN_FAILURE, message: error };
};

export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";

//#endregion Login

//#region Add Bid

export const ADD_BID_SUCCESS = "ADD_BID_SUCCESS";
export const addBidSuccess = json => {
  const bidResult = normalize(json, Bid);
  return { type: ADD_BID_SUCCESS, id: json._id, entities: bidResult.entities };
};

export const ADD_BID_FAILURE = "ADD_BID_FAILURE";
export const addBidFailure = error => {
  return { type: ADD_BID_FAILURE, message: error };
};

export const ADD_BID_REQUEST = "ADD_BID_REQUEST";
export const addBid = (amount, id) => dispatch => {
  dispatch({ type: ADD_BID_REQUEST, id, amount });
  return fetch("http://localhost:8080/createBid/" + id, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ amount })
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

//#endregion Add Bid

//#region Add Listing

export const ADD_LISTING_SUCCESS = "ADD_LISTING_SUCCESS";
export const addListingSuccess = json => {
  const listingResult = normalize(json, Listing);
  return {
    type: ADD_LISTING_SUCCESS,
    id: json._id,
    entities: listingResult.entities
  };
};

export const ADD_LISTING_FAILURE = "ADD_LISTING_FAILURE";
export const addListingFailure = error => {
  return { type: ADD_LISTING_FAILURE, message: error };
};
export const ADD_LISTING_REQUEST = "ADD_LISTING_REQUEST";
export const addListing = args => dispatch => {
  dispatch({ type: ADD_LISTING_REQUEST, args });

  return fetch("http://localhost:8080/createListing", {
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
      .catch(error => dispatch(addListingFailure(error)));
};

//#endregion Add Listing

//#region Update Bid

export const UPDATE_BID_SUCCESS = "UPDATE_BID_SUCCESS";
export const updateBidSuccess = json => {
  const bidResults = normalize(json, Bid);
  return { type: UPDATE_BID_SUCCESS, entities: bidResults.entities };
};

export const UPDATE_BID_FAILURE = "UPDATE_BID_FAILURE";
export const updateBidFailure = error => {
  return { type: UPDATE_BID_FAILURE, message: error };
};

export const UPDATE_BID_REQUEST = "UPDATE_BID_REQUEST";
export const updateBid = (id, status) => dispatch => {
  dispatch({ type: UPDATE_BID_REQUEST, id, status });
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
      .catch(error => dispatch(updateBidFailure(error)))
  );
};

//#endregion Update Bid

//#region Payload
//#region Agent Payload

export const GET_AGENT_PAYLOAD_SUCCESS = "GET_AGENT_PAYLOAD_SUCCESS";
export const getAgentPayloadSuccess = json => {
  const bidResults = normalize(json.user, User);
  return { type: GET_AGENT_PAYLOAD_SUCCESS, entities: bidResults.entities };
};

export const GET_AGENT_PAYLOAD_FAILURE = "GET_AGENT_PAYLOAD_FAILURE";
export const getAgentPayloadFailure = error => {
  return { type: GET_AGENT_PAYLOAD_FAILURE, message: error };
};

export const GET_AGENT_PAYLOAD_REQUEST = "GET_AGENT_PAYLOAD_REQUEST";
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

//#endregion Agent Payload
//#region Seller Payload

export const GET_SELLER_PAYLOAD_SUCCESS = "GET_SELLER_PAYLOAD_SUCCESS";
export const getSellerPayloadSuccess = json => {
  const listingResults = normalize(json.user, User);
  return {
    type: GET_SELLER_PAYLOAD_SUCCESS,
    entities: listingResults.entities
  };
};

export const GET_SELLER_PAYLOAD_FAILURE = "GET_SELLER_PAYLOAD_FAILURE";
export const getSellerPayloadFailure = error => {
  return { type: GET_SELLER_PAYLOAD_FAILURE, message: error };
};

export const GET_SELLER_PAYLOAD_REQUEST = "GET_SELLER_PAYLOAD_REQUEST";
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

//#endregion Seller Payload
//#endregion Payload

//#region Get Listing

export const GET_LISTING_SUCCESS = "GET_LISTING_SUCCESS";
export const getListingSuccess = json => {
  const listingResults = normalize(json.listing, Listing);
  return { type: GET_LISTING_SUCCESS, entities: listingResults.entities };
};

export const GET_LISTING_FAILURE = "GET_LISTING_FAILURE";
export const getListingFailure = error => {
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

//#endregion Get Listing

export const DELETE_LISTING_SUCCESS = "DELETE_LISTING_SUCCESS";
export const deleteListingSuccess = (id, bidIds) => {
  return {
    type: DELETE_LISTING_SUCCESS,
    id,
    bidIds
  };
};

export const DELETE_LISTING_FAILURE = "DELETE_LISTING_FAILURE";
export const deleteListingFailure = error => {
  return { type: DELETE_LISTING_FAILURE, message: error };
};

export const DELETE_LISTING_REQUEST = "DELETE_LISTING_REQUEST";
export const deleteListing = (listingId, bidIds) => dispatch => {
  dispatch({ type: DELETE_LISTING_REQUEST, listingId, bidIds });
  

  return fetch(`http://localhost:8080/listings/${listingId}`, {
    method: "DELETE",
    credentials: "include"
  })
    .then(res => {
      return res.ok ? Promise.resolve() : Promise.reject(res.status);
    })
    .then(json => {
      bidIds.forEach(bidId => dispatch(deleteBidSuccess(bidId)));
      dispatch(deleteListingSuccess(listingId, bidIds))
    })
    .catch(error => {
      bidIds.forEach(bidId => dispatch(deleteBidFailure(bidId)));
      dispatch(deleteListingFailure(error))
    });
};
export const DELETE_BID_SUCCESS = "DELETE_BID_SUCCESS";
export const deleteBidSuccess = id => {
  return {
    type: DELETE_BID_SUCCESS,
    id
  };
};

export const DELETE_BID_FAILURE = "DELETE_BID_FAILURE";
export const deleteBidFailure = error => {
  return { type: DELETE_BID_FAILURE, message: error };
};

export const DELETE_BID_REQUEST = "DELETE_BID_REQUEST";
export const deleteBid = id => dispatch => {
  dispatch({ type: DELETE_BID_REQUEST, id });
  return fetch(`http://localhost:8080/bids/${id}`, {
    method: "DELETE",
    credentials: "include"
  })
    .then(res => {
      return res.ok ? Promise.resolve() : Promise.reject(res.status);
    })
    .then(json => dispatch(deleteBidSuccess(id)))
    .catch(error => dispatch(deleteBidFailure(error)));
};

export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const logoutSuccess = () => dispatch => {
  dispatch({ type: LOG_OUT_SUCCESS })
  history.push("/");
};

export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";
export const logoutFailure = error => {
  return { type: LOG_OUT_FAILURE, message: error};
}
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const logOut = () => {
 return dispatch => {
   dispatch({ type: LOG_OUT_REQUEST});
   return fetch(`http://localhost:8080/logout`, {
     credentials: "include",
     method: "GET",
     headers: {
       "Content-Type": "application/json"
     }
   })
  .then(() => dispatch(logoutSuccess()))
  .catch(error => dispatch(logoutFailure(error)))
};
}
