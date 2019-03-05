import React from "react";
import "./signup-style.css";
import { connect } from "react-redux";
import { signUp } from "../actions/index";
export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
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
              this.props.login(this.state.email, this.state.password);
            }}
          >
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
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
                value={this.state.password}
                onChange={event =>
                  this.setState({ password: event.target.value })
                }
                className="form-control"
                name="password"
              />
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
  dispatch => {
    return {
      signUp: (username, password) => dispatch(signUp(username, password))
    };
  }
)(signUp);
