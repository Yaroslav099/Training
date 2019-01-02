import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { logOutUser } from '../../firebase-services';

class Header extends Component {
  navList = ['Home', 'Program', 'Training', 'Food', 'logOut'];

  setLinks = linkName => {
    const name = linkName.toLocaleLowerCase();
    if (name === 'home') return '/';
    if (name === 'logout') return '';
    return `/${name}/`;
  };

  logOut = e => {
    if (e.target.innerHTML === 'logOut') {
      const { history } = this.props;
      logOutUser(history);
    }
  };

  render() {
    return (
      <ul className="nav nav-pills navigation">
        {this.navList.map(item => (
          <li className="nav-item" key={item}>
            <Link className="nav-link" to={this.setLinks(item)} onClick={e => this.logOut(e)}>
              {item}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default withRouter(Header);
