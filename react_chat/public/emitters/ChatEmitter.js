"use strict";

function ChatEmitter() {
  EventEmitter.call(this);
  this._peers = {};
}

ChatEmitter.prototype = Object.create(EventEmitter.prototype);

ChatEmitter.prototype.onMessage = function (cb) {
  this.addListener(Actions.USER_MESSAGE, cb);
};

ChatEmitter.prototype.onUserConnected = function (cb) {
  this.addListener(Actions.USER_CONNECTED, cb);
};

ChatEmitter.prototype.onUserDisconnected = function (cb) {
  this.addListener(Actions.USER_DISCONNECTED, cb);
};

ChatEmitter.prototype.setUsername = function (username) {
  this._username = username;
};

ChatEmitter.prototype.getUsername = function () {
  return this._username;
};

ChatEmitter.prototype.send = function (user, message) {
  this._peers[user].send(message);
};

ChatEmitter.prototype.broadcast = function (message) {                                                                                                   
  for (var peer in this._peers) {
    return this.send(peer, message);
  }
};

ChatEmitter.prototype.connect = function (username) {
  var self = this;

  this.setUsername();
  this.socket = io();
  this.socket.on("connect", function () {
    self.socket.on(Actions.USER_CONNECTED, function (userId) {
      if (userId === self.getUsername()) return;
      self._connectTo(userId);
      self.emit(Actions.USER_CONNECTED, userId);
      console.log("User connected", userId);
    });
  });
  self.socket.on(Actions.USER_DISCONNECTED, function (userId) {
    if (userId === self.getUsername()) return;
    self._disconnectFrom(userId);
    self.emit(Actions.USER_DISCONNECTED, userId);
    console.log("User disconnected", userId);
  });
  console.log("Connection with username", username);
  this.peer = new Peer(username, {
    host: location.hostname,
    port: 9000,
    path: "chat",
  });
  this.peer.on("open", function (userId) {
    self.setUsername(userId);
  });
  this.peer.on("connection", function (connection) {
    console.log(connection);
    self._registerPeer(connection.peer, connection);
    self.emit(Actions.USER_CONNECTED, {});
  });
};

ChatEmitter.prototype._connectTo = function (username) {
  var connection = this.peer.connect(username);
  connection.on(
    "open",
    function () {
      this._registerPeer(username, connection);
    }.bind(this)
  );
};

ChatEmitter.prototype._registerPeer = function (username, connection) {
  console.log("Registration is in progress!");
  this._peers[username] = connection;
  connection.on(
    "data",
    function (message) {
      console.log("Message received!", message);
      this.emit(Actions.USER_MESSAGE, { content: message, author: username });
    }.bind(this)
  );
};

ChatEmitter.prototype._disconnectFrom = function (username) {
  delete this._peers[username];
};
