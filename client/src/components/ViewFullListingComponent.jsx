import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import BidBoxForm from "./BidForm";
import BidBox from "./BidBoxContainer";
import NoListing from "./noListing";
import Navbar from "./NavbarComponent";
import DeleteBox from "./deleteWarning";
import { denormalize } from "normalizr";
import { Listing } from "../schema";
import { getListing, deleteListing } from "./../actions/index";
import "./styles/full-listing-styles.css";

export class FullListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    return this.props
      .getListing(this.props.match.params.id)
      .then(() => this.setState({ loading: false }));
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading</h1>;
    }

    if (this.props.listing === undefined) {
      return <NoListing />;
    }

    return (
      <div>
        <Navbar />
        <div className="listing-container">
          <div className="headline-banner">
            <Link to="/profile"><button>Go Back To Profile</button></Link>
          </div>
          <div className="listing-view">
          <p>{this.props.listing.headline}</p>
          <div className="listing-image-container">
            <img alt="loading" src={require("./styles/images/condo-1.jpg")} />
          </div>
          <div className="listing-info-container">
            <ul className="listing-info">
              <li>Address: {this.props.listing.street} {this.props.listing.zip}</li>
              <li>No. of bedrooms: {this.props.listing.bed}</li>
              <li>No. of bathrooms: {this.props.listing.bath}</li>
              <li>Total sq. footage: {this.props.listing.footage}</li>
              <li>
                Description of the property: {this.props.listing.description}
              </li>
            </ul>
          </div>
          </div>
          {this.props.listing.bids.map(bid => {
            return <BidBox key={bid._id} {...bid} />;
          })}
          {console.log(this.props.listing.user._id)}
          {console.log(this.props.userId)}
          {this.props.listing.user._id !== this.props.userId && (
            <BidBoxForm listingId={this.props.match.params.id} />
          )}
        </div>
        {this.props.listing.user._id === this.props.userId && (
          <DeleteBox
            deleteListing={this.props.deleteListing}
            listingId={this.props.match.params.id}
            bidIds={this.props.listing.bids.map(bid => bid._id)}
          />
        )}
      </div>
    );
  }
}
//refactor getListing and deleteListing for mapDispatchToProps
export default connect(
  /* istanbul ignore next */
  (state, props) => {
    const id = props.match.params.id;
    const listing = denormalize(id, Listing, state.entities);
    const user_id = state.currentUser.user; 
    return {
      listing,
      userId: user_id
    };
  },
  /* istanbul ignore next */
  dispatch => {
    return {
      getListing: id => dispatch(getListing(id)),
      deleteListing: (id, bidIds) => dispatch(deleteListing(id, bidIds))
    };
  }
)(FullListing);
