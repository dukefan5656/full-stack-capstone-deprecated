import React from "react";
import {Link} from 'react-router-dom'
import "./styles/seller-main-style.css";

export default function SellerMain(props) {
  console.log(props.listings);
  return (
    <div className="main-container">
      <div className="header">
        <p>You do not have any current listings, click below to add one!</p>
      </div>
      <div className="button-container">
        <Link to="/create-listing">Create A Listing</Link>
      </div>
    </div>
  );
}
