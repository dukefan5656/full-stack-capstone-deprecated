import React from "react";
import BidBox from "./BidBoxContainer";
import MiniSellerListings from "./MiniSellerListingsComponent";
import SellerMain from "./SellerProfileMainComponent";
import Navbar from "./NavbarComponent";
import ListingForm from "./CreateListing";
import { connect } from 'react-redux';
import { getSellerPayload, getListing, addListing } from '.././actions/index';

export class Seller extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      bids: [],
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
        
          <BidBox bids={this.props.bids} />
        
        {this.props.listings.map(listing => {
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
    const user_id = state.user.user;
    const userListings = Object.values(state.listing).filter(listing => listing.user === user_id);
    const sellerBids = userListings.map(listing => listing.bids);
    
    return {
      listings: userListings,
      bids: []
    }
  },
  dispatch => {
    return {
     getPayload: () => dispatch(getSellerPayload()),
     getListing: () => dispatch(getListing()),
     addListing: () => dispatch(addListing())
    }
  }
)(Seller);