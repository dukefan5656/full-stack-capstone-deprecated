import React from "react";
import { Link } from "react-router-dom";
import "./styles/mini-listing.css";

export default function MiniListing(props) {
  let endpoint = "/listing/"+props._id;
  return (
    <Link to={endpoint}>
    <div className="mini-listing-container">
      <div className="image-container">
        <img alt="loading" src={props.image} />
      </div>
      <div className="description-container">
        <ul className="description">
          <li>{props.headline}</li>
          <li>
            {props.street}
            {props.zip}
            {props.state}
          </li>
          <li>{props.type}</li>
          <li>{props.bed}</li>
          <li>{props.bath}</li>
          <li>{props.footage}</li>
        </ul>
      </div>
    </div>
    </Link>
  );
}


