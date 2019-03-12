import React from "react";
import {Link} from 'react-router-dom';

export default function MiniSellerListings(props) {
  let endpoint = `/listing/${props._id}`;
  return (
    <Link to={endpoint}>
    <div key={props.index} className="mini-listing-container">
      <div className="mini-listings">
        <ul>
          <li>
            <img alt="loading" src={require(`${props.image}`)}/>
          </li>
          <li>{props.headline}</li>
        </ul>
      </div>
    </div>
    </Link>
  );
}
