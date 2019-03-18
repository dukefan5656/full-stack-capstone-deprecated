import React from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import DeleteBox from './deleteWarning';
import { denormalize } from "normalizr";
import { Listing } from "../schema";
import { deleteListing } from "./../actions/index";
import "./styles/mini-listing.css";

export function MiniSellerListings(props) {
  let endpoint = `/listing/${props._id}`;
  return (
    <div className="listing-container">
    <Link to={endpoint}>
    <div className="mini-listing-container">
      <div className="mini-listings">
      <li>{props.headline}</li>
          <li>
            <img alt="loading" src={require("./styles/images/condo-1.jpg")}/>
          </li>
          
      <DeleteBox 
      
      deleteListing={props.deleteListing}
      listingId={props._id}
      bidIds={props.bidIds}
      />
      </div>
    </div>
    </Link>
    </div>
  );
}
export default connect(
  /* istanbul ignore next */
  (state, props) => {
    
    const id = props._id;
    const listing = denormalize(id, Listing, state.entities);
    return {
      bidIds: listing ? listing.bids.map(bid => bid._id) : []
    };
  },
  /* istanbul ignore next */
  dispatch => {
    return {
      deleteListing: (id, bidIds) => dispatch(deleteListing(id, bidIds))
    };
  }
)(MiniSellerListings)
