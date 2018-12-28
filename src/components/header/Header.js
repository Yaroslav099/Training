import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  navList = ['Home', 'Program', 'Training', 'Food'];

  setLinks = linkName => {
    const name = linkName.toLocaleLowerCase();
    if (name === 'home') return '/';
    return `/${name}/`;
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
      </ul>
    );
  }
}
