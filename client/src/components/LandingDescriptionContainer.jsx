import React from "react";
import "./styles/LandingDescription.css";

export default function LandingDescription() {
  return (
    <div className="landing-description-container">
      <div className="headline-container">
        <p>
          WE PUT THE POWER IN THE HANDS OF THE SELLER. IN THIS SELLER'S MARKET,
          IT IS IMPORTANT TO MAXIMIZE YOUR OPPORTUNITY.
        </p>
      </div>
      <div class="features-container">
        <div class="features-child">
          <div>
            <img src="./images/collaboration.png" />
            <span>
              <p>LIST YOUR PROPERTY</p>
              <p>Whether you are selling your house, land, or commercial space, you can list with the confidence that you are in control and will get the best possible price for your listing.</p>
            </span>
          </div>

          <div class="features-child">
            <img src="./images/hotel-building.png" />
            <span>
              <p>ONCE YOU'VE LISTED</p>
              <p>When you list your property, agents will bid on what they believe they can sell your property for. You can also require a bid for commission percentage and other factors involved in the sale.</p>
            </span>
          </div>
          <div class="features-child">
            <img src="./images/route.png" />
            <span>
              <p>BIDS</p>
              <p>You will also be able to set what kind of bidding you'd like. Whether the bids are silent or public. Also, you can set whether you will field private offers from buyers.</p>
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
