import React, { Component } from "react";
import LandingPage from "./components/LandingPageContainer";
import Login from "./components/LoginContainer";
import Search from "./components/SerchPageContainer";
import Agent from "./components/agentProfileComponent";
import Seller from "./components/SellerProfileContainer";
import CreateListing from "./components/CreateListing";
import FullListing from "./components/ViewFullListingComponent";
// import Signup from './components/SignupContainer';
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";

// <Route  exact path="/signup" component={Signup} />

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route  path="/create-listing" component={CreateListing} />
          <Route  path="/listing/:id" component={FullListing} />
          <Route  path="/seller-profile" component={Seller} />
          <Route  path="/search" component={Search} />
          <Route  path="/login" component={Login} />
          <Route  path="/agent-profile" component={Agent} />
        </Switch>
      </Router>
    );
  }
}

export default App;
