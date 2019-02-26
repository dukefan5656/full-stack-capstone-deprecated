import React from "react";
import "./styles/agent-style.css";
import { Link } from "react-router-dom";
import BidBox from "./BidBoxContainer";
import Navbar from "./NavbarComponent";

export default class Agent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bids: []
    };
  }

  render() {
    return (
      <div>
        <Navbar />
        <BidBox />
        <div className="main">
          <Link to="/search">Go To Search</Link>
        </div>
      </div>
    );
  }
}
