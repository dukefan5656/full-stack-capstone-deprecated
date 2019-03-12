import React from "react";
import Seller from "./SellerProfileContainer";
import Agent from "./agentProfileComponent";
import { connect } from "react-redux";

export class Profile extends React.Component {
  render() {
    if (this.props.userType === "seller") {
      return <Seller />;
    } else {
      return <Agent />;
    }
  }
}

export default connect(store => {
  const userType = store.currentUser.userType;
  return { userType };
})(Profile);
