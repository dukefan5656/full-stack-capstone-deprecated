import React from "react";
import { Link } from "react-router-dom";
import "./styles/mini-listing.css";

export default function MiniListing(props) {
  let endpoint = "/listing/" + props._id;
  console.log(props);
  return (
    <Link to={endpoint}>
      <div className="mini-listing-container">
      <div className="listing">
        <div className="image-container">
          <img alt="loading" src={require("./styles/images/condo-1.jpg")} />
        </div>
        <div className="description-container">
          <ul className="description"> 
            <li>{props.headline}</li>
            <li>
              Address: {props.street}
               <span> {props.zip}</span>
              {props.state}
            </li>
             <li>Property Type: {props.type}</li>
            <li>No. of Bedrooms: {props.bed}</li>
            <li>No. of Bathrooms: {props.bath}</li>
            <li>Total Sq. Footage: {props.footage}</li>
          </ul>
        </div>
        </div>
      </div>
    </Link>
  );
}
