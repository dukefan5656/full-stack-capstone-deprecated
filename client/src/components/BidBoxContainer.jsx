import React from "react";
import { connect } from "react-redux";
import "./styles/bid-box-style.css";
import { updateBid, deleteBid } from ".././actions/index";
import DeleteBidBox from "./deleteBidBox";

export class BidBox extends React.Component {

  render() {
    if (
      this.props.userId === this.props.user._id ||
      this.props.userId === this.props.listing.user._id
    ) {
      return (
        <div className="bid-box">
          <React.Fragment>
            <div className="image-container">
            <img alt="loading" src={require("./styles/images/condo-1.jpg")}/>
            </div>
            <div className="bid-box-description-container">
              <ul className="bid-box-description">
                <li>Bid Submitted By: {this.props.user.local.email}</li>
                <li>Bid Amount: {this.props.amount}</li>
                <li>{this.props.status}</li>
              </ul>
            </div>
            {/*react conditional rendering*/}
            {this.props.userId === this.props.listing.user._id && (
              <div className="buttons-container">
                <button
                  type="button"
                  value="rejected"
                  name="rejected"
                  onClick={event => {
                    this.props.updateBid(this.props._id, event.target.value);
                  }}
                >
                  Reject
                </button>
                <button
                  type="button"
                  value="accepted"
                  name="accepted"
                  onClick={event => {
                    this.props.updateBid(this.props._id, event.target.value);
                  }}
                >
                  Accept
                </button>
                
              </div>
            )}
            
            {this.props.userId === this.props.user._id && (
              <div className="delete-bid-button-container">
              <DeleteBidBox deleteBid={this.props.deleteBid} bidId={this.props._id} />               
              </div>
            )}
          </React.Fragment>
        </div>
      );
    } else {
      return null;
    }
  }
}
//todo add delete bid
export default connect(
  /* istanbul ignore next */
  (state) => {
    const user_id = state.currentUser.user;
    return {
      userId: user_id
    };
  },
  /* istanbul ignore next */
  dispatch => {
    return {
      updateBid: (id, status) => dispatch(updateBid(id, status)),
      deleteBid: (id) => dispatch(deleteBid(id))
    };
  }
)(BidBox);
