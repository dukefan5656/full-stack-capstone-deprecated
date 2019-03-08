import React from "react";

export default function MiniSellerListings(props) {
  return (
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
  );
}
