import React from "react";
import { connect } from "react-redux";
import { addListing } from "../actions/index";
import "./styles/create-listing-style.css";

export class ListingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      headline: "",
      street: "",
      zip: "",
      city: "",
      type: "",
      bed: 0,
      bath: 0,
      footage: 0,
      description: ""
    };
  }
  render() {
    return (
      <div className="form-style-8">
      <h2>Create a listing</h2>
      <form
        onSubmit={event => {
          event.preventDefault();
          console.log(this.state);
          this.props.addListing(this.state);
          
        }}
      >
        <div className="form-group">
          <label>Headline</label>
          <input
            type="text"
            required
            value={this.state.headline}
            onChange={event => this.setState({ headline: event.target.value })}
            className="form-control"
            name="headline"
          />
        </div>
        <div className="form-group">
          <label>Street</label>
          <input
            type="text"
            required
            value={this.state.street}
            onChange={event => this.setState({ street: event.target.value })}
            className="form-control"
            name="street"
          />
        </div>
        <div className="form-group">
          <label>Zipcode</label>
          <input
            type="text"
            required
            value={this.state.zip}
            onChange={event => this.setState({ zip: event.target.value })}
            className="form-control"
            name="zip"
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            required
            value={this.state.city}
            onChange={event => this.setState({ city: event.target.value })}
            className="form-control"
            name="city"
          />
        </div>
        <div className="form-group">
          <label>Property Type</label>
          <select
            id="property-type"
            required
            value={this.state.type}
            onChange={event =>
              this.setState({ type: event.target.value })
            }
            className="form-control"
            name="type"
            
            
          > <option>Select Property Type</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
            <option value="Trailer">Trailer</option>
          </select>
        </div>
        <div className="form-group">
          <label>Number of Bedrooms</label>
          <input
            type="number"
            required
            value={this.state.bed}
            onChange={event => this.setState({ bed: event.target.value })}
            className="form-control"
            name="bed"
          />
        </div>
        <div className="form-group">
          <label>Number of Bathrooms</label>
          <input
            type="number"
            required
            value={this.state.bath}
            onChange={event => this.setState({ bath: event.target.value })}
            className="form-control"
            name="bath"
          />
        </div>
        <div className="form-group">
          <label>Total sq. Footage</label>
          <input
            type="number"
            required
            value={this.state.footage}
            onChange={event => this.setState({ footage: event.target.value })}
            className="form-control"
            name="footage"
          />
        </div>
        <div className="form-group">
          <label>Describe Your Property</label>
          <br/><input
            id="textbox"
            type="text-box"
            required
            value={this.state.description}
            onChange={event =>
              this.setState({ description: event.target.value })
            }
            className="form-control"
            name="description"
          />
        </div>

        <button type="submit" className="btn btn-warning btn-lg">
          Submit
        </button>
      </form>
      </div>
    );
  }
}

export default connect(
  null,
  /* istanbul ignore next */
  dispatch => ({ addListing: args => dispatch(addListing(args)) })
)(ListingForm);
