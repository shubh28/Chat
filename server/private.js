let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let path = require('path');

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../client', 'private.html'));
});

let users = {};
let sockets = {};

io.on('connection', function(socket) {

    // Register your client with the server, providing your username
    socket.on('init', function(username) {
        users[username] = socket.id;    // Store a reference to your socket ID
        sockets[socket.id] = { username : username, socket : socket };  // Store a reference to your socket
        // console.log(sockets);
        io.emit('connectUser', username);
    });
    // Private message is sent from client with username of person you want to 'private message'
    socket.on('chat', function(to, from, message) {
        // Lookup the socket of the user you want to private message, and send them your message
        sockets[users[to]].socket.emit('chat', to, from, message);
    });

    socket.on('notifyUser', function(user){
        // to show user typing
        io.emit('notifyUser', user);
    });

    socket.on('userConnected', function (from, to) {
        // from is connected to 'to'
        sockets[users[to]].socket.emit('userConnected', from, to);
    })
});


http.listen(3000, function(){
    console.log('listening on *:3000');
});