let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let path = require('path');

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

io.on('connection', function(socket){
    socket.on('chat', function(from, msg){
        io.emit('chat', from, msg);
    });
    socket.on('notifyUser', function(user){
        io.emit('notifyUser', user);
    });
});


http.listen(3000, function(){
    console.log('listening on *:3000');
});