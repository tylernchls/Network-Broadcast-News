const net = require('net');



// allows user to type in data and sent to server
const client = net.connect({port: 6969}, () => {
  console.log('connected to server');
  process.stdin.on('data', (data) => {
    client.write(data.toString());
  });
});

// allows data sent from server to be sent to user and displayed
client.on('data', (data) => {
  process.stdout.write(data.toString());

});


