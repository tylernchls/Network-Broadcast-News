const net = require('net');
const Port = 6969;
const EVENT_DATA = 'data';   // CAPITAL_CASE difines a constant that never changes


// allows user to type in data and sent to server
const client = net.connect({port: Port}, () => {
 console.log('CONNECTED TO SERVER:\n ' + 'enter userName:\n');
  process.stdin.on(EVENT_DATA, (data) => {
    client.write(data.toString());
  });
});

// allows incoming data from server to be sent to user and displayed
client.on(EVENT_DATA, (data) => {
  process.stdout.write(data.toString());

});


