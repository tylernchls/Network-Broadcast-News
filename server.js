const net = require('net');

var clients = [];

var server = net.createServer((socket) => {
  clients.push(socket);  // stores each socket that connects in the array
  socket.on('error', (err) => {
    throw err;
  });

  // gets incoming data from client and writes it back to all sockets connected/stored in array
  socket.on('data', (data) => {

    for(var i = 0; i <clients.length; i++){
      clients[i].write(data.toString());
    }

  });



  socket.on('end', () => {
    console.log('someone disconnected;<');
  });
});




// errors if the server emits the error event
server.on('error', (err) => {
  throw err;
});






server.listen(6969, () => {
  console.log('opened server on', server.address());
});