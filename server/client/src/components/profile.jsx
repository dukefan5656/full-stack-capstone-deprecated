import React from "react";
import Seller from "./SellerProfileContainer";
import Agent from "./agentProfileComponent";
import { connect } from "react-redux";

export class Profile extends React.Component {
  render() {
    if (this.props.userType === "agent") {
      return <Agent />;
    } else {
    
      return <Seller />;
    }
  }
}

export default connect(
  /* istanbul ignore next */
  store => {
    const userType = store.currentUser.userType;
    return { userType };
  }
)(Profile);
