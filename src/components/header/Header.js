import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { logOutUser } from '../../firebase-services/auth-services';

class Header extends Component {
  navList = ['Home', 'Program', 'Training', 'Food'];

  setLinks = linkName => {
    const name = linkName.toLocaleLowerCase();
    if (name === 'home') return '/';
    if (name === 'logout') return '/authentication';
    return `/${name}/`;
  };

  logOut = () => {
    const { history } = this.props;
    logOutUser(history);
  };

  render() {
    return (
      <ul className="nav nav-pills navigation">
        {this.navList.map(item => (
          <li className="nav-item" key={item}>
            <Link className="nav-link" to={this.setLinks(item)}>
              {item}
            </Link>
          </li>
        ))}
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/authentication"
            action="replace"
            onClick={() => this.logOut()}
          >
            LogOut
          </Link>
        </li>
      </ul>
    );
  }
}

export default withRouter(Header);
