import React from "react";
import "./styles/agent-style.css";
import "./styles/navbar-style.css";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import {denormalize} from 'normalizr';
import {Bid} from "../schema";
import BidBox from "./BidBoxContainer";
import Navbar from "./NavbarComponent";
import {getAgentPayload} from '.././actions/index';

export class Agent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount(){
   return this.props.getPayload()
   .then(() => this.setState({ loading: false }));
}
  render() {
   if (this.state.loading) {
      return <h1>Loading</h1>;
    }
    return (
      <React.Fragment>
        <Navbar />
        <Link to="/search"><button>Go To Search</button></Link>
        {this.props.bids.length === 0 ? <div className="alert"><p>You don't have any current bids. Click the search button below to find a listing to bid on!</p></div>
         : <div className="alert"><p>Current bids on listings. Click on one below to visit the full listing</p></div>}
      <div className="agent-profile-container">
        {this.props.bids.map(bid => {
            return <div key={bid._id} ><Link style={{ textDecoration: 'none' }} to={`/listing/${bid.listing._id}`}><BidBox {...bid} /></Link></div>; 
          })}
      </div>
      <div className="search-link">
      </div>
      </React.Fragment>
    );
  }
}
export default connect(
  /* istanbul ignore next */
  //if user id was included in the user schema then these could be consolodated 
  state => {
    const user_id = state.currentUser.user;
    const userBids = Object.values(state.entities.bids).filter(bid => bid.user === user_id);
    const userBidsIds = userBids.map(bidId => bidId._id);
    return {
      bids: denormalize(userBidsIds, [Bid], state.entities)
    }
  },
  /* istanbul ignore next */
  dispatch => {
    return {
     getPayload: () => dispatch(getAgentPayload()),
     
    }
  }
)(Agent);