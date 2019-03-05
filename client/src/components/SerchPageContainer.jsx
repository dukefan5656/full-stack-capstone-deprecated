import React from "react";
import { connect } from 'react-redux';
import "./styles/search-page-style.css";
import Navbar from "./NavbarComponent";
import MiniListing from "./MiniListingContainer";
import { getListing } from '.././actions/index';


export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCity: "",
      searchZip: "",
      searchType: "",
      results: []
    };
  }

  render() {
    return (
      <div>
        <Navbar />
        <form
          onSubmit={event => {
            event.preventDefault();
            return fetch('http://localhost:8080/listings', {
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
            })
            .then(response => response.json()).then(listings => this.setState({results: listings}));
          }}
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
          console.log(result);
          return <MiniListing {...result} />;
        })}
      </div>
    );
  }
}

export default connect(
  // state => {
  //   console.log(state);
  //   const listing_id = '5c7e93342f562215884f777b';
  // //   // const user_id = state.user.id;
  //   const userListing = state.results.filter(listing => listing.id === listing_id);
  //   return {
  //     listings: userListing
  //   }
  // },
  dispatch => {
    return {
     getListing: () => dispatch(getListing('5c7e93342f562215884f777b'))
    }
  }

)(Search);

