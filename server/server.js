const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const app = express();
const {generateMessage, generateLocationMessage} = require('./utils/message');
var {Users} = require('./utils/users');
const {isValidString} = require('./utils/string-validation');
const publicPath = path.join(__dirname, '../public');
const PORT =  process.env.PORT || 8080;

app.use(express.static(publicPath));
var server = http.createServer(app);

var io = socketIO(server);
var hash = {};
var users = new Users();

io.on('connection', (socket) => {

  socket.on('join', (params, callback) => {
    if(!isValidString(params.username) || !isValidString(params.chatroom)){
      return callback("Either of username or chat room name is not valid");
    }

    socket.join(params.chatroom);
    users.removeUser(users.findUser(socket.id));
    users.addUser(socket.id, params.username, params.chatroom);
    //sent to only new connected user
    socket.emit("newMessage", generateMessage('Admin', `Welcome to chat app ${params.username}`));
    //send to all connected user of chat room except the user who sent the message
    socket.broadcast.to(params.chatroom).emit('newMessage', generateMessage('admin', `${params.username} joined`));
    //send the message to all connected user of chat room
    io.to(params.chatroom).emit('updateUserList', users.getUserList(params.chatroom));
    callback();
  });

  socket.on('createMessage', function(message, callback){
    // console.log("id =  "+socket.id);
    // console.log("room =  "+Object.keys(socket.rooms));
    // var room = Object.keys(socket.rooms).toString();
    // room = room.split(',')[1];
    var user = users.findUser(socket.id);
    if(user && message.text.length > 0) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
      callback("message received from server");
    }
  });

  socket.on('geoLocation', function(message, callback){
    var location = message.coords.latitude + ', ' + message.coords.longitude;
    var user = users.findUser(socket.id);
    if(user) {
      io.to(user.room).emit('locationMessage', generateLocationMessage(user.name, message.coords.latitude, message.coords.longitude));
      callback('location msg received from server');
    }
  });


  socket.on('disconnect', () => {
    console.log("user is disconned "+socket.id);

    var user = users.removeUser(socket.id);
    console.log(JSON.stringify(user));
    io.to(user.room).emit('newMessage', generateMessage('admin', `${user.name} left`));
    io.to(user.room).emit('updateUserList', users.getUserList(user.room));
  });
});

server.listen(PORT, function(){
  console.log(`Server is up on ${PORT}`);
})

// console.log(__dirname + /../public);
