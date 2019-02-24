import React, {Component} from 'react'
import LandingPage from './components/LandingPageContainer';
import Login from './components/LoginContainer';
import Search from './components/SerchPageContainer';
// import Signup from './components/SignupContainer';
import {Router, Route, Switch } from 'react-router-dom';
import history from './history';
// <Route  exact path="/signup" component={Signup} /> 

class App extends React.Component {

  render() {
    return (
    <Router history={history}>
      <Switch>
        <Route exact path="/search" component={Search} />
        <Route  exact path="/" component={LandingPage} />
        <Route  exact path="/login" component={Login} />
      </Switch>
    </Router>
    )
  }
}

export default App
