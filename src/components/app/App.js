import React, { Component } from 'react';
import { HashRouter as Router, Redirect } from 'react-router-dom';
import withAuth from './WithAuth';
import Header from '../header';
import Routs from './Routs';

class App extends Component {
  render() {
    const { authUser, redirect } = this.props;
    return (
      <Router>
        <React.Fragment>
          {authUser ? <Header authUser={authUser} /> : null}
          {redirect ? <Redirect to="/authentication" /> : null}
          <Routs />
        </React.Fragment>
      </Router>
    );
  }
}

export default withAuth(App);
