/* eslint-disable linebreak-style */
'use strict';

const PeertoPeerServer = require('peer').PeerServer;
const express = require('express');
const Actions = require('./public/src/Action.js');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

const server = app.listen(port);
const io = require('socket.io').listen(server);

console.log(`Server is up on ${port} port`);

const p2pServer = new PeertoPeerServer({port: 9000, path: '/chat'});

p2pServer.on('connection', function(id) {
  io.emit(Actions.USER_CONNECTED, id);
  console.log(`User connection with #${id} established!`);
});

p2pServer.on('disconnect', function(id) {
  io.emit(Actions.USER_DISCONNECTED, id);
  console.log(`#${id} has leaved the chat!`);
});
