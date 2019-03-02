import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import BidBox from "./BidBoxContainer";
import Navbar from "./NavbarComponent";
import { getListing as actionGetListing } from './../actions/index';

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
    console.log(this.props.listing);
    return (
      <div>
        <Navbar />
        <div className="main">
          <Link to="/seller">Go Back To Profile</Link>
        </div>
      </div>
    );
  }
}

export default connect(
  (state, props) => {
    const id = props.match.params.id;
    return {
      listing: state.listing[id]
    };
  },
  dispatch => {
    return {
      getListing: id => dispatch(actionGetListing(id))
    }
  }
)(FullListing);