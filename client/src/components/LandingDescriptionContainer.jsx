import React from "react";
import "./styles/LandingDescription.css";

export default function LandingDescription() {
  return (
    <div className="landing-description-container">
      <div className="headline-container">
        <p>
          We put the power in the hands of the seller. In this seller's market,
          it is important to maximize your opportunity.
        </p>
      </div>
      <div class="features-container">
        <div class="features-child">
          <div>
            <img src="./images/collaboration.png" />
            <span>
              Set a budget for your trip and track it dynamically as you create
              legs for your vacation.
            </span>
          </div>

          <div class="features-child">
            <img src="./images/hotel-building.png" />
            <span>
              Include lodging information so you can easily view and manage
              bookings.
            </span>
          </div>
          <div class="features-child">
            <img src="./images/route.png" />
            <span>
              Add routing information to your journey so that you can easily
              manage scheduling to each destination.
            </span>
          </div>
        </div>
      </div>
      <div className="call-to-action-container">
        <p>Let's get started! Choose one of the options below</p>
      </div>
    </div>
  );
}
