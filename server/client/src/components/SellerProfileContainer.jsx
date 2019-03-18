import React from "react";
import BidBox from "./BidBoxContainer";
import MiniSellerListings from "./MiniSellerListingsComponent";
import Navbar from "./NavbarComponent";
import ListingForm from "./CreateListing";
import { connect } from "react-redux";
import { getSellerPayload } from ".././actions/index";
import { denormalize } from "normalizr";
import { Listing, Bid } from "../schema";
import "./styles/profile-style.css";
export class Seller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
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
        <main className="seller-profile-container">
          <section style={{ backgroundColor: '#193d5c' }}>
            <div className="heading">
              {this.props.listings.length === 0 ? <p>You don't currently have any active listings</p> : <p>
                View Your Listings. You can click the picture below to view the full
                details
              </p>}
            </div>
            <ul>
              {this.props.listings.map(listing => {
                return <MiniSellerListings key={listing._id} {...listing} />;
              })}
            </ul>
          </section>
          <div className="listing-form-container">
            <ListingForm />
          </div>
          <div className="bid-box-container">
          {this.props.bids.length === 0 ? <p>You don't currently have any active bids</p> : <p>Current bids for your listing</p>}
            {this.props.bids.map(bid => {
              return <BidBox key={bid._id} {...bid} />;
            })}
          </div>
          
          
        </main>
      </React.Fragment>
    );
  }
}
export default connect(
  //if user id was included in the user schema then these could be consolodated
  /* istanbul ignore next */
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
  /* istanbul ignore next */
  dispatch => {
    return {
      getPayload: () => dispatch(getSellerPayload())
    };
  }
)(Seller);
