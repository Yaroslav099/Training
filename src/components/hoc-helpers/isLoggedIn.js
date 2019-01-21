import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { GetUser } from '../../firebase-services';

const { getUserNameFromStorage } = new GetUser();

const isLoggedIn = Component => {
  const path = window.location.hash;
  const path2 = '#/';
  console.log(path);
  return class extends Component {
    render() {
      if (!getUserNameFromStorage() && path !== '#/authentication' && path2)
        return <Redirect to="/authentication" />;
      return <Component {...this.props} />;
    }
  };
};

export default isLoggedIn;
