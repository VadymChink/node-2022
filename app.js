const express = require('express');
const expressFileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require("path");
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');

require('dotenv').config({path: path.join(process.cwd(), 'environments', `${process.env.MODE}.env`)});

const {config} = require("./constants");
const {userRouter, authRouter} = require('./routes');
const cronRun = require('./crons');

mongoose.connect(config.URL_DB);

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {cors: 'http://localhost:63342'});

io.on('connection', (socket) => {

    console.log(socket.handshake.query);
    console.log(socket.handshake.auth);

    socket.emit('connectSuccess', {hello: 'world'})

    socket.on('sendMessage', (messageData) => {
        console.log('Socket', socket.id, 'with auth token',
            socket.handshake.auth.token, 'send message:',
            messageData.message);

        socket.broadcast.emit('message:received', {
            user: 'Vadym',
            message: 'Hello word'
        });

        setTimeout(() => {
            io.emit('globalBroadcast', 'TEST SOCKET')
        }, 2000)
    })

    socket.on('room:join', (JoinInfo) => {
        socket.join(JoinInfo.roomID);

        //To all room members
        // io.to(JoinInfo.roomID).emit('room:remember', {id: socket.id})

        // To all room members except sender
        socket.to(JoinInfo.roomID).emit('room:remember', {id: socket.id})
    })
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

if (config.NODE_ENV !== 'prod') {
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

// app.use(cors(_configureCors()));
app.use(expressFileUpload());

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.use('*', (req, res) => {
    res.status(404).json('Route not found');
});

app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            error: err.message || 'Unknown error',
            code: err.status || 500,
        })
});

server.listen(config.PORT, () => {
    console.log(`Server listen host ${config.PORT}`);
    // cronRun();
});

function _configureCors() {
    const whitelist = config.CORS_WHITE_LIST.split(';')

    return {
        origin: (origin, callback) => {
            if (whitelist.includes(origin)) {
                return callback(null, true)
            }
            callback(new Error('Not allowed by CORS'))
        }
    }
}