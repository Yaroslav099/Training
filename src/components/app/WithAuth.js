import React, { Component } from 'react';
import { GetUser } from '../../firebase-services';
import { logOutUser, setUserAsOnline } from '../../firebase-services/auth-services';
import Loader from '../loader';

const { getUserName } = new GetUser();

window.onbeforeunload = () => logOutUser(getUserName());

const withAuth = Component => {
  return class extends Component {
    state = {
      authUser: null,
      loading: true,
      redirect: false,
    };

    _isMounted = false;

    getUserNameFromStorage = () => localStorage.getItem('authUser');

    componentDidMount() {
      this._isMounted = true;
      const authUser = this.getUserNameFromStorage();
      if (authUser) {
        this.setState({ authUser, loading: false });
      } else {
        getUserName(authUser => {
          this.setState({ authUser, loading: false });
          if (this._isMounted) {
            setUserAsOnline(authUser);
          }
        });
      }
    }

    componentDidUpdate() {
      const { authUser, redirect } = this.state;
      if (authUser === null && redirect === false) {
        this.setState({ redirect: true });
      }
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    render() {
      const { loading } = this.state;
      const withLoading = loading ? <Loader /> : <Component {...this.state} />;
      return withLoading;
    }
  };
};

export default withAuth;
