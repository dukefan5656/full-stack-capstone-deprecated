import React from "react";
import Navbar from "./NavbarComponent";
import { connect } from 'react-redux';
import "./styles/mini-listing.css";
import { getListing } from '.././actions/index';

export default function MiniListing(props) {
  console.log(props);
  return (
    
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
  );
}


