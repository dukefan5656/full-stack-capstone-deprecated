import React from 'react';
import './mini-listing.css';
MiniListing.defaultProps={
  headline: "",
  image: "../images/condo-1.jpg",
  address: {
    street: "",
    zip: "",
    city: "",
  },
  type: "",
  bed: 0,
  bath: 0,
  footage: 0
}

export default function MiniListing(props){
  return(
    <div className="mini-listing-container">
      <div className="image-container">
      <img alt="loading" src={props.image}/>
      </div>
      <div className="description-container">
        <ul className="description">
          <li>{props.headline}</li>
          <li>{props.address.street}{props.address.zip}{props.address.zip}</li>
          <li>{props.type}</li>
          <li>{props.bed}</li>
          <li>{props.bath}</li>
          <li>{props.footage}</li>
        </ul>

      </div>
    </div>
  )
}