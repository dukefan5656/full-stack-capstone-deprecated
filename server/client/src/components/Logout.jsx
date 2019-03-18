import React from 'react'; 
import {logOut} from ".././actions/index";
import { connect } from "react-redux";

import './styles/navbar-style.css';

export class Logout extends React.Component {
    componentDidMount() {
        return this.props.logOut();
      }
    
    render(){
    return (null)
}
}
export default connect(
    /* istanbul ignore next */
    state => ({}),
    /* istanbul ignore next */
    dispatch => {
      return {
        logOut: () => dispatch(logOut())
      };
    }
  )(Logout);