import React from "react";
import { connect } from "react-redux";
import "./styles/bid-box-style.css";
import { updateBid } from ".././actions/index";
export class BidBox extends React.Component {
  render() {
    if (
      this.props.userId === this.props.user._id ||
      this.props.userId === this.props.listing.user._id
    ) {
      return (
        <div className="bid-box-container">
          <div>
            <p>Current bids for this listing</p>
          </div>
          <React.Fragment>
            <div className="image-container">
              <img src="" alt="loading" />
            </div>
            <div className="bid-box-description-container">
              <ul className="bid-box-description">
                <li>{this.props.user.local.email}</li>
                <li>{this.props.amount}</li>
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
  (state) => {
    const user_id = state.currentUser.user;
    return {
      userId: user_id
    };
  },
  dispatch => {
    return {
      updateBid: (id, status) => dispatch(updateBid(id, status))
    };
  }
)(BidBox);
