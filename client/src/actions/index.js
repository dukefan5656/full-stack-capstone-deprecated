import { API_BASE_URL } from "../config/api";
import history from "../history";

export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const signUp = (email, password, type) => {
  return dispatch => {
    dispatch({ type: SIGN_UP_SUCCESS, email });
    console.log("test");
    return fetch(`/auth/signup`, {
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
      .then(json => dispatch(signUpSuccess(json)))
      .catch(error => dispatch(signUpFailure(error)));
  };
};

export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const logIn = (email, password) => {
  console.log(email, password);
  return dispatch => {
    dispatch({ type: LOG_IN_REQUEST, email });
    console.log("test");
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
        console.log(res);
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

const signUpSuccess = json => {
  const { id, email, userType } = json;
  return { id, email, userType, type: LOG_IN_SUCCESS };
};

const signUpFailure = error => {
  return { type: LOG_IN_FAILURE, message: error };
};

export const SIGN_UP_FAILURE = "";

export const SIGN_UP_REQUEST = "";

const logInSuccess = json => {
  return dispatch => {
    dispatch({
      type: LOG_IN_SUCCESS,
      user: json.user._id,
      email: json.user.local.email
    });
    history.push("/seller-profile");
  };
};

const logInFailure = error => {
  console.log(error);
  return { type: LOG_IN_FAILURE, message: error };
};

export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";

const ADD_BID_SUCCESS = "ADD_BID_SUCCESS";
const addBidSuccess = json => {
  return { type: ADD_BID_SUCCESS, payload: json.payload };
};

const ADD_BID_FAILURE = "ADD_BID_FAILURE";
const addBidFailure = error => {
  return { type: ADD_BID_FAILURE, message: error };
};
export const ADD_BID_REQUEST = "ADD_BID_REQUEST";
export const addBid = (...args) => dispatch => {
  dispatch({ type: ADD_BID_REQUEST });
  return fetch("http://localhost:8080/createBid/5c7c1f4aa7132d3728ebee4c", {
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
    .then(json => dispatch(addBidSuccess(json)))
    .catch(error => dispatch(addBidFailure(error)));
};

const ADD_LISTING_SUCCESS = "ADD_LISTING_SUCCESS";
const addListingSuccess = json => {
  return { type: ADD_LISTING_SUCCESS, payload: json.payload };
};

const ADD_LISTING_FAILURE = "ADD_LISTING_FAILURE";
const addListingFailure = error => {
  return { type: ADD_LISTING_FAILURE, message: error };
};
export const ADD_LISTING_REQUEST = "ADD_LISTING_REQUEST";
export const addListing = (...args) => dispatch => {
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
            console.log("bad");
            throw Error("API: " + JSON.stringify(json));
          });
        }

        return res.text().then(text => {
          console.log("worst");
          throw Error("HTTP " + res.status + " : " + text);
        });
      })
      .then(json => dispatch(addListingSuccess(json)))
      //    .then(json => dispatch(addListingSuccess(json, args)))
      .catch(error => dispatch(addListingFailure(error)))
  );
};

const GET_LISTING_SUCCESS = "GET_LISTING_SUCCESS";
const getListingSuccess = json => {
  return { type: GET_LISTING_SUCCESS, payload: json.listing };
};

const GET_LISTING_FAILURE = "GET_LISTING_FAILURE";
const getListingFailure = error => {
  return { type: GET_LISTING_FAILURE, message: error };
};

const GET_SELLER_PAYLOAD_SUCCESS = "GET_SELLER_PAYLOAD_SUCCESS";
const getSellerPayloadSuccess = json => {
  return {
    type: GET_SELLER_PAYLOAD_SUCCESS,
    payload: { user: json.user, listings: json.listings }
  };
};

const GET_SELLER_PAYLOAD_FAILURE = "GET_SELLER_PAYLOAD_FAILURE";
const getSellerPayloadFailure = error => {
  return { type: GET_SELLER_PAYLOAD_FAILURE, message: error };
};

const GET_SELLER_PAYLOAD_REQUEST = "GET_SELLER_PAYLOAD_REQUEST";
export const getSellerPayload = () => dispatch => {
  dispatch({ type: GET_SELLER_PAYLOAD_REQUEST });

  return fetch(`http://localhost:8080/seller_profile/`, {
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
export const GET_LISTING_REQUEST = "GET_LISTING_REQUEST";
export const getListing = id => dispatch => {
  dispatch({ type: GET_LISTING_REQUEST, id });
  console.log("fetch request:");
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
    // history.push("/seller-profile");
};


const DELETE_LISTING_SUCCESS = "DELETE_LISTING_SUCCESS";
const deleteListingSuccess = json => {
  return {
    type: DELETE_LISTING_SUCCESS,
    payload: { id: json._id }
  };
};

const GET_SELLER_PAYLOAD_FAILURE = "GET_SELLER_PAYLOAD_FAILURE";
const getSellerPayloadFailure = error => {
  return { type: GET_SELLER_PAYLOAD_FAILURE, message: error };
};

export const DELETE_LISTING_REQUEST = "DELETE_LISTING_REQUEST";
export const deleteListing = id => dispatch => {
  dispatch({type: DELETE_LISTING_REQUEST, id});
  return fetch(`http://localhost:8080/delete_listing` + id, {
    method: "DELETE",
    credentials: "include"
  })
  .then(res => {
    if (res.headers.get("Content-Type").includes("application/json")) {
      if (res.ok) {
        return res.redirect('http://localhost:8080/seller_profile');
      }

      return res.json().then(json => {
        throw Error("API: " + JSON.stringify(json));
      });
    }

    return res.text().then(text => {
      throw Error("HTTP " + res.status + " : " + text);
    });
  })
  .then(json => dispatch(deleteListingSuccess(json)))
  .catch(error => dispatch(deleteListingFailure(error)));
}
