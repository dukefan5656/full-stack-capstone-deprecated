import React from "react";
import LandingPage from "./components/LandingPageContainer";
import Login from "./components/LoginContainer";
import Signup from "./components/SignupContainer";
import Search from "./components/SerchPageContainer";
import Profile from "./components/profile";
import CreateListing from "./components/CreateListing";
import FullListing from "./components/ViewFullListingComponent";
import Logout from "./components/Logout";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";

//todo create auth route that checks condition and directs to desired page or home page
class App extends React.Component {
  
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route  exact path="/" component={LandingPage} />
          <Route  path="/create-listing" component={CreateListing} />
          <Route  path="/listing/:id" component={FullListing} />
          <Route  path="/profile" component={Profile} />
          <Route  path="/search" component={Search} />
          <Route  path="/login" component={Login} />
          <Route  path="/signup" component={Signup} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </Router>
    );
  }
}

export default App;
