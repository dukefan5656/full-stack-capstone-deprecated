import React from "react";
import "./styles/search-page-style.css";
import Navbar from "./NavbarComponent";
import MiniListing from "./MiniListingContainer";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCity: "",
      searchZip: "",
      searchType: "",
      results: []
    };
  }

  search(city, zip, type){
    return fetch("http://localhost:8080/listings", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        city: this.state.searchCity,
        zip: this.state.searchZip,
        type: this.state.searchType
      })
    });
  }

  handleSubmit(event){
    event.preventDefault();
    return this.search(this.state.searchCity, this.state.searchZip, this.state.searchType)
      .then(response => response.json())
      .then(listings => this.setState({ results: listings }));
  }

  render() {
    return (
      <div>
        <Navbar />
        <form className="search-form"
          onSubmit={event => this.handleSubmit(event)}
        >
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              value={this.state.searchCity}
              onChange={event =>
                this.setState({ searchCity: event.target.value })
              }
              className="form-control"
              name="searchCity"
            />
          </div>
          <div className="form-group">
            <label>Zipcode</label>
            <input
              type="text"
              value={this.state.searchZip}
              onChange={event =>
                this.setState({ searchZip: event.target.value })
              }
              className="form-control"
              name="searchZip"
            />
          </div>
          <div className="form-group">
            <label>Property Type</label>
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

          <button type="submit" className="btn btn-warning btn-lg">
            Search Properties
          </button>
        </form>
        {this.state.results.map(result => {
          return <MiniListing key={result._id} {...result} />;
        })}
      </div>
    );
  }
}
