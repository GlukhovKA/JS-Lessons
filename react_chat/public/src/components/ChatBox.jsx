/** @jsx React.DOM */

"use strict";

var ChatBox = React.createClass({
  componentDidMount: function () {
    this.chatEmitter = this.props.chatProxy;
    this.chatEmitter.connect(this.props.username);
    this.chatEmitter.onMessage(this.addMessage.bind(this));
    this.chatEmitter.onUserConnected(this.userConnected.bind(this));
    this.chatEmitter.onUserDisconnected(this.userDisonnected.bind(this));
  },

  userConnected: function (user) {
    var users = this.state.users;
    users.push(user);
    this.setState({
      users: users,
    });
  },
  userDisonnected: function (user) {
    var users = this.state.users;
    users.splice(users.indexOf(user), 1);
    this.setState({
      users: users,
    });
  },

  getInitialState: function () {
    return {
      users: [],
    };
  },

  addMessage: function (message) {
    if (message) {
      console.log(message);
    }
  },

  render: function () {
    console.log(this.props);
    console.log(this);
    return (
      <div className="chat-box" ref="root">
        <div className="chat-header">REACT CHAT</div>
        <div>
          <UsersList users={this.state.users} ref="usersList"></UsersList>
        </div>
      </div>
    );
  },
});