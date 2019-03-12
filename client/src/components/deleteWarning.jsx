import React from 'react';
import {deleteListing} from '../actions/index';



export default function DeleteBox(props) {
  return (
    <div className="delete-warning-container">
      <p>Are you sure you want to delete this listing? It cannot be undone.</p>
      <button onClick={event => {
            event.preventDefault();
            props.deleteListing(props.listingId)
          }}>Delete</button>
      <button>Back to Profile</button>
    </div>
  )
  };
//add the redux connect to return deleteListing
