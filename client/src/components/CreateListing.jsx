import React from "react";

export default class ListingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      headline: "",
      address: {
        street: "",
        zip: "",
        city: ""
      },
      type: "",
      bed: 0,
      bath: 0,
      footage: 0,
      description: ""
    };
  }
  render() {
    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          this.props.listing(
            this.state.images,
            this.state.headline,
            this.state.address,
            this.state.type,
            this.state.bed,
            this.state.bath,
            this.state.footage,
            this.state.description
          );
        }}
      >
        <div className="form-group">
          <label>Headline</label>
          <input
            type="text"
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
            value={this.state.address.street}
            onChange={event =>
              this.setState({
                address: { ...this.state.address, street: event.target.value }
              })
            }
            className="form-control"
            name="street"
          />
        </div>
        <div className="form-group">
          <label>Zipcode</label>
          <input
            type="text"
            value={this.state.address.zip}
            onChange={event =>
              this.setState({
                address: { ...this.state.address, zip: event.target.value }
              })
            }
            className="form-control"
            name="zip"
          />
        </div>
        <div className="form-group">
          <label>city</label>
          <input
            type="text"
            value={this.state.address.city}
            onChange={event =>
              this.setState({
                address: { ...this.state.address, city: event.target.value }
              })
            }
            className="form-control"
            name="city"
          />
        </div>
        <div className="form-group">
          <label>type</label>
          <select
            id="property-type"
            value={this.state.searchType}
            onChange={event =>
              this.setState({ searchType: event.target.value })
            }
            className="form-control"
            name="searchType"
          >
            <option value="House">House</option>
            <option value="Condo">Condo</option>
            <option value="Trailer">Trailer</option>
          </select>
        </div>
        <div className="form-group">
          <label>Number of Bedrooms</label>
          <input
            type="number"
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
            value={this.state.footage}
            onChange={event => this.setState({ footage: event.target.value })}
            className="form-control"
            name="footage"
          />
        </div>
        <div className="form-group">
          <label>Describe Your Property</label>
          <input
            type="text"
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
    );
  }
}