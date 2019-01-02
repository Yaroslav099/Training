import React, { Component } from 'react';
import FbServices from '../../firebase-services';
import Loader from '../loader';

const { getUserName } = new FbServices();

const withAuth = Component => {
  return class extends Component {
    state = {
      authUser: null,
      loading: true,
      redirect: false,
    };

    getUserNameFromStorage = () => localStorage.getItem('authUser');

    componentDidMount() {
      const authUser = this.getUserNameFromStorage();
      if (authUser) {
        this.setState({ authUser, loading: false });
      } else {
        getUserName(authUser => {
          this.setState({ authUser, loading: false });
        });
      }
    }

    componentDidUpdate() {
      const { authUser, redirect } = this.state;
      if (authUser === null && redirect === false) {
        this.setState({ redirect: true });
      }
    }

    render() {
      const { loading } = this.state;
      const withLoading = loading ? <Loader /> : <Component {...this.state} />;
      return withLoading;
    }
  };
};

export default withAuth;
