import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { signUpUser } from '../../firebase-services';

class SignUp extends Component {
  render() {
    const { history } = this.props;
    return (
      <div className="signUpContainer">
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">User name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputUserName"
            placeholder="User name"
            ref={node => {
              this._signUpUserName = node;
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            ref={node => {
              this._signUpEmail = node;
            }}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            ref={node => {
              this._signUpPassword = node;
            }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() =>
            signUpUser(
              this._signUpEmail.value,
              this._signUpPassword.value,
              this._signUpUserName.value,
              history
            )
          }
        >
          Submit
        </button>
      </div>
    );
  }
}

export default withRouter(SignUp);
