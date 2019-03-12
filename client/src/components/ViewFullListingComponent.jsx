import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import BidBoxForm from "./BidForm";
import BidBox from "./BidBoxContainer";
import Navbar from "./NavbarComponent";
import DeleteBox from './deleteWarning';
import {denormalize} from 'normalizr';
import {Listing} from "../schema";
import { getListing, deleteListing } from './../actions/index';

export class FullListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    

  }
  componentDidMount(){
    return this.props.getListing(this.props.match.params.id)
      .then(() => this.setState({ loading: false }));
  }
  
  render() {

    if (this.state.loading){
      return <h1>Loading</h1>;
    }
    
    if (this.props.listing === undefined){
      return <h1>Listing does not exist</h1>
    }
    return (
      <div>
        <Navbar />
        <div className="listing-container">
        <div className="headline-banner">
        <p>{this.props.listing.headline}</p>
        </div>
        <div className="listing-image-container">
          <img alt="loading" src=".././images/condo-1.jpg"/>
        </div>
        <div className="listing-info-container">
        <ul>
          <li>{this.props.listing.bed}</li>
          <li>{this.props.listing.bath}</li>
          <li>{this.props.listing.footage}</li>
          <li>{this.props.listing.description}</li>
        </ul>
        </div>
        {this.props.listing.bids.map(bid => {
            return <BidBox {...bid} />;
          })}
        <BidBoxForm listingId={this.props.match.params.id} />
        </div>
          <Link to="/seller">Go Back To Profile</Link>
        <DeleteBox deleteListing={this.props.deleteListing} listingId={this.props.match.params.id} />
      </div>
    );
  }
}
//refactor getListing and deleteListing for mapDispatchToProps
export default connect(
  (state, props) => {
    const id = props.match.params.id;
    const listing = denormalize(id, Listing, state.entities)
    return {
      listing
    };
  },
  dispatch => {
    return {
      getListing: id => dispatch(getListing(id)),
      deleteListing: id => dispatch(deleteListing(id))
    }
  }
)(FullListing);