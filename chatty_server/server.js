// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid');

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

var usersOnline = 0;
wss.on('connection', (ws) => {
  console.log('Client connected');

  usersOnline += 1;

  wss.broadcast(JSON.stringify({
    type: 'userCount',
    data: {
      usersOnline: usersOnline
    }
  }))

  ws.on('message', function incoming(message) {

    var tempMessage = JSON.parse(message);

    if (tempMessage["type"] === 'postMessage') {
      tempMessage["type"]='incomingMessage';
    } else if (tempMessage["type"] === 'postNotification') {
      tempMessage["type"]='incomingNotification';
    } else {
      tempMessage["type"]='UNKNOWN_TYPE';
    }

    var newMessage = JSON.stringify(tempMessage);

    wss.broadcast(newMessage);
    }
  )

  ws.on('close', () => {
    usersOnline -= 1;
    wss.broadcast(JSON.stringify({
      type: 'userCount',
      data: {
        usersOnline: usersOnline
      }
    }));
    console.log('Client disconnected')
  });
});