import React from "react";
import "./styles/agent-style.css";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import {denormalize} from 'normalizr';
import {Bid} from "../schema";
import BidBox from "./BidBoxContainer";
import Navbar from "./NavbarComponent";
import {getAgentPayload} from '.././actions/index';

export class Agent extends React.Component {
  
  componentDidMount(){
   return this.props.getPayload();
}
  render() {
    return (
      <div>
        <Navbar />
        {this.props.bids.map(bid => {
            return <BidBox {...bid} />;
          })}
        <div className="main">
          <Link to="/search">Go To Search</Link>
        </div>
      </div>
    );
  }
}
export default connect(
  //if user id was included in the user schema then these could be consolodated 
  state => {
    const user_id = state.currentUser.user;
    const userBids = Object.values(state.entities.bids).filter(bid => bid.user === user_id);
    const userBidsIds = userBids.map(bidId => bidId._id);
    return {
      bids: denormalize(userBidsIds, [Bid], state.entities)
    }
  },
  dispatch => {
    return {
     getPayload: () => dispatch(getAgentPayload()),
     
    }
  }
)(Agent);