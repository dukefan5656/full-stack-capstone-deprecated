import React from "react";
import ReceivedBids from "./SellerBidsComponent";
import MiniSellerListings from "./MiniSellerListingsComponent";
import SellerMain from "./SellerProfileMainComponent";
import Navbar from "./NavbarComponent";
import ListingForm from "./CreateListing";

export default class Seller extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      bids: [{ amount: 5000, agent: "Chris Rudder" }],
      listings: []
    };
  }
  setEditing(editing) {
    this.setState({
        editing
    });
}
  render() {

    return (
      <div>
        <Navbar />
        {this.state.bids.map(bid => {
          return <ReceivedBids {...bid} />;
        })}
        {this.state.listings.map(listing => {
          return <MiniSellerListings {...listing} />;
        })}
        <SellerMain />
        <ListingForm />
      </div>
    );
  }
}
