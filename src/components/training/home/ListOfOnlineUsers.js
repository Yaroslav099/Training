import React, { Component } from 'react';
import { GetUser } from '../../../firebase-services';

const { getOnlineUsers } = new GetUser();

class ListOfOnlineUsers extends Component {
  state = {
    onlineUsers: [],
  };

  componentDidMount() {
    getOnlineUsers(onlineUsers => {
      this.setState({ onlineUsers });
    });
  }

  render() {
    const { onlineUsers } = this.state;
    return (
      <ul className="onlineUsersContainer">
        {onlineUsers.map((el, i) => (
          <li className="onlineUsers-item" key={i}>
            <p>{el},</p>
          </li>
        ))}
      </ul>
    );
  }
}

export default ListOfOnlineUsers;
