import React from 'react';
import { withRouter } from 'react-router-dom';

const AuthForm = ({ history }) => {
  const goToRegistrationForm = () => {
    history.push('/signUp/');
  };

  const goToLogInForm = () => {
    history.push('/signIn/');
  };

  return (
    <div className="authFormContainer">
      <h1 className="authTitle">You need to authorize to see the information</h1>
      <button type="button" className="btn btn-primary" onClick={goToLogInForm}>
        Sign In
      </button>
      <button type="button" className="btn btn-warning" onClick={goToRegistrationForm}>
        Sign Up
      </button>
    </div>
  );
};

export default withRouter(AuthForm);
