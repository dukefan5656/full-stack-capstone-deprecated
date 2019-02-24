import React from 'react';
import './search-page-style.css';
import Navbar from './NavbarComponent';
import MiniListing from './MiniListingContainer';

export default class Search extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      searchCity: "",
      searchZip: "",
      searchType: '',
      results: [],
      headline: "",
      image: "../images/condo-1.jpg",
      address: {
        street: "",
        zip: "",
        city: "",
      },
      type: "",
      bed: 0,
      bath: 0,
      footage: 0
    };
  };

  render(){
    return (
      <div>
      <Navbar />
        <form onSubmit={event => {
          event.preventDefault();
          // this.search(this.state.city, this.state.zip, this.state.type, this.state.results);
        }}>
            <div className="form-group">
                <label>City</label>
                <input type="text" value={this.state.searchCity} onChange={event => this.setState({ searchCity: event.target.value })} className="form-control" name="searchCity"/>
            </div>
            <div className="form-group">
                <label>Zipcode</label>
                <input type="text" value={this.state.searchZip} onChange={event => this.setState({ searchZip: event.target.value })} className="form-control" name="searchZip"/>
            </div>
            <div className="form-group">
                <label>Property Type</label>
                <select id="property-type" value={this.state.searchType} onChange={event => this.setState({ searchType: event.target.value })} className="form-control" name="searchType">
                                    <option value="House">House</option>
                                    <option value="Condo">Condo</option>
                                    <option value="Trailer">Trailer</option>
                                </select>
            </div>

            <button type="submit" className="btn btn-warning btn-lg">Search Properties</button>
        </form>
        <MiniListing />
      </div>
    )
    }
  }
// export default connect(null, dispatch => {
//   return {
//     login: (username, password) => dispatch(logIn(username, password))
//   }
// })(Login);