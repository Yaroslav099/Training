import React, { Component } from 'react';
import FbServices from '../../firebase-services';
import { withRouter } from 'react-router-dom';
import { signInUser } from '../../firebase-services';

const { getUserName } = new FbServices();

class SignIn extends Component {
  render() {
    const { history } = this.props;
    return (
      <div className="signInContainer">
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            ref={node => {
              this._signInEmail = node;
            }}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            ref={node => {
              this._signInPassword = node;
            }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() =>
            signInUser(this._signInEmail.value, this._signInPassword.value, history, getUserName)
          }
        >
          Submit
        </button>
      </div>
    );
  }
}

export default withRouter(SignIn);
