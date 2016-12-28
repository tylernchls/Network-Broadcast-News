const net = require('net');
const bannedWords = require('./bannedWords.js');


var clients = [];

// creates new socket connection
var server = net.createServer((socket) => {
  console.log('New remote connection detected: ' + socket.remoteAddress);
  clients.push(socket);  // stores each socket that connects in the array
  socket.on('error', (err) => {
    throw err;
  });

  /*
  first: grabs first piece of data, checks if userName is undefined and sets userName.
  else will continue on to normal chat. Any Message sent, all connected sockets will
  recieve with the senders userName attached to the message.

  */

  socket.on('data', (data) => {
      console.log(data.toString());
    if(socket.userName == undefined) {
      socket.userName = data.toString().trim();
      console.log(socket.userName + ' has joined that chat');


    } else if(data.toString() === bannedWords){
          return true;
    } else {

      for(var i = 0; i < clients.length; i++) {
        if(clients[i] === socket) {  // won't write data to socket sending the data

        } else {
            clients[i].write(socket.userName + ' says: ' + data.toString());
        }
      }

    }


  });


  // removes socket from array when disconnected
  socket.on('end', () => {
    for(var i = clients.length - 1; i >= 0; i--) {
      if(clients[i] === socket) {
          clients.splice(i, 1);
          console.log(socket.userName + ' has disconnected');
      }
    }

  });

  // errors if the server emits the error event
  server.on('error', (err) => {
    throw err;
  });

});


// gives server ability to write admin message to all connected sockets
process.stdin.on('data', (data) => {
  for(var i = 0; i < clients.length; i++) {
    clients[i].write('Admin: ' + data.toString());

  }

});


server.listen(6969, () => {
  console.log('opened server on', server.address());
});























