const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(3001);

app.get('/', function (req, res) {
  res.send('<H1>Hello world</H1>');
});

io.on('connection', function (socket) {
  console.log('A user connected');

  // socket.emit('news', { hello: 'world' });
  socket.on('message', function (data) {
    io.emit('message', data)
    console.log(data);
  });
});