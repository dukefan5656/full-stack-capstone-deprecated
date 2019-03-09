import React from "react";
import {Link} from 'react-router-dom';

export default function MiniSellerListings(props) {
  let endpoint = `/listing/${props._id}`;
  return (
    <Link to={endpoint}>
    <div className="mini-listing-container">
      <div className="heading">
        <h3>View Your Listings</h3>
      </div>
      <div className="mini-listings">
        <ul>
          <li>
            <img src={props.image} />
          </li>
          <li>{props.headline}</li>
        </ul>
      </div>
    </div>
    </Link>
  );
}
