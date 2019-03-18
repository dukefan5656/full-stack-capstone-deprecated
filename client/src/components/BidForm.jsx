import React from "react";
import { connect } from "react-redux";
import { addBid } from "./../actions/index";

export class BidBoxForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0
    };
  }
  render() {
    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          this.props.bid(this.state.amount, this.props.listingId);
        }}
      >
        <div className="form-group">
          <label>Bid</label>
          <input
            type="text"
            value={this.state.amount}
            onChange={event => {
              this.setState({ amount: event.target.value });
            }}
            className="form-control"
            name="bid"
          />
        </div>

        <button type="submit" className="btn btn-warning btn-lg">
          Submit Bid
        </button>
      </form>
    );
  }
}

//todo adjust reducer or action to update redux
export default connect(
  null,
  /* istanbul ignore next */
  dispatch => {
    return {
      bid: (amount, id) => dispatch(addBid(amount, id))
    };
  }
)(BidBoxForm);
