import React from "react";
// import "./signup-style.css";
import { connect } from "react-redux";
import { signup } from "../actions/index";
export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      type: ""
    };
  }

  render() {
    return (
      <div className="container">
        <div className="col-sm-6 col-sm-offset-3">
          <h1>
            <span className="fa fa-sign-in" />
            Sign-up
          </h1>

          <form
            onSubmit={event => {
              event.preventDefault();
              this.props.signup(
                this.state.email,
                this.state.password,
                this.state.type
              );
            }}
          >
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                required
                value={this.state.email}
                onChange={event => this.setState({ email: event.target.value })}
                className="form-control"
                name="email"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                required
                value={this.state.password}
                onChange={event =>
                  this.setState({ password: event.target.value })
                }
                className="form-control"
                name="password"
              />
            </div>
            <div className="form-group">
              <label>User Type</label>
              <input
                type="radio"
                value="agent"
                required
                onChange={event => this.setState({ type: event.target.value })} 
                className="form-control"
                name="type"
              />Agent
              <input
                type="radio"
                value="seller"
                onChange={event => this.setState({ type: event.target.value })} 
                className="form-control"
                name="type"
              />Seller
            </div>

            <button type="submit" className="btn btn-warning btn-lg">
              Sign-up
            </button>
          </form>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
          <p>
            Or go <a href="/">home</a>.
          </p>
        </div>
      </div>
    );
  }
}
export default connect(
  null,
  /* istanbul ignore next */
  dispatch => {
    return {
      signup: (username, password, type) =>
        dispatch(signup(username, password, type))
    };
  }
)(Signup);
