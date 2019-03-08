import React from 'react';
import {deleteListing} from '../actions/index';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";


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

