import React from "react";
import "./styles/bid-box-style.css";

export default class BidBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bids: [
        {
          image: "../../images/condo-1.jpg",
          seller: "",
          amount: 0,
          status: ""
        }
      ]
    };
  }

  render() {
    const cards = this.state.bids.map((bid, index) => (
      <React.Fragment>
        <div className="image-container">
          <img src={bid.image} alt="loading" />
        </div>
        <div className="bid-box-description-container">
          <ul className="bid-box-description">
            <li key={index}>{bid.seller}</li>
            <li key={index}>{bid.amount}</li>
          </ul>
        </div>
      </React.Fragment>
    ));
    return <div className="bid-box-container">{cards}</div>;
  }
}
