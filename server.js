const net = require('net');

var clients = [];

var server = net.createServer((socket) => {
  console.log('connected: ' + socket.remoteAddress);
  clients.push(socket);  // stores each socket that connects in the array
  socket.on('error', (err) => {
    throw err;
  });

  // gets incoming data from client and writes it back to all sockets connected/stored in array
  socket.on('data', (data) => {

    for(var i = 0; i < clients.length; i++) {
      if(clients[i] === socket) {  // won't write data to socket sending the data
        return;
      } else {
          clients[i].write(data.toString());
      }

    }
  });



  socket.on('end', () => {
    for(var i = clients.length - 1; i >= 0; i--) {
      if(clients[i] === socket) {
          clients.splice(i, 1);
          // console.log(clients);
      }

    }

  });
});


// errors if the server emits the error event
server.on('error', (err) => {
  throw err;
});

// gives server ability to write admin message to all connected sockets
process.stdin.on('data', (data) => {
  for(var i = 0; i < clients.length; i++) {
    clients[i].write(data.toString());

  }

});









server.listen(6969, () => {
  console.log('opened server on', server.address());
});




