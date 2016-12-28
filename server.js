const net = require('net');

var server = net.createServer((socket) => {
  console.log('connection made');
  socket.on('error', (err) => {
    throw err;
  });

  socket.on('data', (data) => {
    console.log('you sent data:', data.toString());
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