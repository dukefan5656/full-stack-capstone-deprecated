import React from "react";
import ReceivedBids from "./SellerBidsComponent";
import MiniSellerListings from "./MiniSellerListingsComponent";
import SellerMain from "./SellerProfileMainComponent";
import Navbar from "./NavbarComponent";
import ListingForm from "./CreateListing";
import { connect } from 'react-redux';
import { getSellerPayload, getListing } from '.././actions/index';

export class Seller extends React.Component {
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
  componentDidMount(){
   return this.props.getPayload();
}


  render() {
    console.log(this.props);
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

export default connect(
  state => {
    console.log(state);
    const user_id = "5c7cd6f08213440d18efb93b";
    // const user_id = state.user.id;
    const userListings = Object.values(state.listing).filter(listing => listing.user === user_id);
    return {
      listings: userListings
    }
  },
  dispatch => {
    return {
     getPayload: () => dispatch(getSellerPayload()),
     getListing: () => dispatch(getListing())
    }
  }
)(Seller);