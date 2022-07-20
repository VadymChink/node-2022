const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');

const {userRouter} = require("./routes");

mongoose.connect('mongodb+srv://VadymVinnichuk:1t2t3t4t5t@cluster0.jdrlr.mongodb.net/users')

const app = express();

const server = http.createServer(app);

const io = socketIO(server, {cors: 'http://localhost:63342'});

io.on('connection', (socket) => {
    console.log('*****************')
    console.log(socket.id);
    console.log('*****************')

    socket.emit('connectSuccess', {hello: 'world'})

    socket.on('sendMessage', (data) => {
        console.log(data);

        //Emit to all user except sender
        socket.broadcast.emit('message:received', {
            user: 'Vadym',
            message: 'hello world'
        });

        //Emit to all users
        setTimeout(() => {
            io.emit('globalBroadcast', 'test Socket')
        }, 2000)
    })

    socket.on('room:join', (joinInfo) => {
        socket.join(joinInfo.roomId);

        //to all room members
        // io.to(joinInfo.roomId).emit('room:newMember',{id: socket.id})

        //to all room members except sender
        socket.to(joinInfo.roomId).emit('room:newMember',{id: socket.id})
    })
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);

app.use('*', (req, res) => {
    res.status(404).json('Route not found')
})

app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            error: err.message || 'Unknown error',
            code: err.status || 500
        })
});

server.listen(5000, () => {
    console.log('Server listen port 5000')
})

