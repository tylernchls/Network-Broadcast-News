const net = require('net');



const client = net.connect({port: 6969}, () => {
  console.log('connected to server');
  process.stdin.on('data', function(data) {
    client.write(data.toString());
  });
});



