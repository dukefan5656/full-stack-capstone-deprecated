import React from 'react';

export default function DeleteBox(props) {
  return (
    <section className="delete-warning-container">
      <button onClick={event => {
            event.preventDefault();
            props.deleteListing(props.listingId, props.bidIds)
          }}>Delete Listing</button>
    </section>
  )
  };
