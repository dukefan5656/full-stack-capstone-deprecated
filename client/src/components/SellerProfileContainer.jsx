import React from "react";
import BidBox from "./BidBoxContainer";
import MiniSellerListings from "./MiniSellerListingsComponent";
import Navbar from "./NavbarComponent";
import ListingForm from "./CreateListing";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getSellerPayload,
  getListing,
  addListing,
  updateBid
} from ".././actions/index";
import { denormalize } from "normalizr";
import { Listing, Bid } from "../schema";
import "./styles/profile-style.css";

export class Seller extends React.Component {
  componentDidMount() {
    return this.props.getPayload();
  }
  render() {
    return (
      <div>
        <Navbar />
        <Link to="/search">
          <button>search</button>
        </Link>
        {this.props.bids.map(bid => {
          return <BidBox {...bid} />;
        })}
        <div className="heading">
          <h3>
            View Your Listings. You can click on one below to view the full
            details
          </h3>
        </div>
        {this.props.listings.map(listing => {
          return <MiniSellerListings {...listing} />;
        })}
        <ListingForm />
      </div>
    );
  }
}
export default connect(
  //if user id was included in the user schema then these could be consolodated
  state => {
    const user_id = state.currentUser.user;
    const userListings = Object.values(state.entities.listings).filter(
      listing => listing.user === user_id
    );
    const userListingsIds = userListings.map(listingId => listingId._id);
    const sellerBidsIds = userListings.reduce(
      (bids, listing) => [...bids, ...listing.bids],
      []
    );

    return {
      listings: denormalize(userListingsIds, [Listing], state.entities),
      bids: denormalize(sellerBidsIds, [Bid], state.entities)
    };
  },
  dispatch => {
    return {
      getPayload: () => dispatch(getSellerPayload()),
    };
  }
)(Seller);
