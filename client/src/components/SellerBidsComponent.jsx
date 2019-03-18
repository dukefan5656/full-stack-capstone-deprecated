import React from "react";

export default function ReceivedBids(props) {
  return (
    <div className="bids-overview-container">
      <div className="heading-container">
        <h3>View Current Bids</h3>
      </div>
      <ul className="bids-container">
        <li>{props.agent}</li>
        <li>{props.amount}</li>
      </ul>
    </div>
  );
}
