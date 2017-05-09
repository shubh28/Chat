let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let path = require('path');

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

io.on('connection', function(socket){
    // when a message is sent from client
    socket.on('chat', function(from, msg){
        // send this message to all the connected users
        io.emit('chat', from, msg);
    });

    // event for  showing typing
    socket.on('notifyUser', function(user){
        // emitting it to all the users
        io.emit('notifyUser', user);
    });
});


http.listen(3000, function(){
    console.log('listening on *:3000');
});