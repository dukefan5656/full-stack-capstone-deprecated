import React from 'react';
import './login-style.css';
import {connect} from 'react-redux';
import {logIn} from '../actions/index';
export class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: ""
    };
  };



  render(){
    return (
    <div className="container">
    <div className="col-sm-6 col-sm-offset-3">

        <h1><span className="fa fa-sign-in"></span> Login</h1>

        
        <form onSubmit={event => {
          event.preventDefault();
          this.props.login(this.state.email, this.state.password);
        }}>
            <div className="form-group">
                <label>Email</label>
                <input type="text" value={this.state.email} onChange={event => this.setState({ email: event.target.value })} className="form-control" name="email"/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" value={this.state.password} onChange={event => this.setState({ password: event.target.value })} className="form-control" name="password"/>
            </div>

            <button type="submit" className="btn btn-warning btn-lg">Login</button>
        </form>
        <p>Need an account? <a href="/signup">Signup</a></p>
        <p>Or go <a href="/">home</a>.</p>

    </div>
    </div>
    )
    }
  }
export default connect(null, dispatch => {
  return {
    login: (username, password) => dispatch(logIn(username, password))
  }
})(Login);