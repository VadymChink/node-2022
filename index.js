const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const http = require('http');
const socketIO = require('socket.io');

require('dotenv').config({path: path.join(process.cwd(), 'environments', `${process.env.MODE}.env`)});

const {userRouter, authRouter} = require("./routes");
const {config} = require("./constants");

mongoose.connect(config.URL_DB);

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {cors: 'http://localhost:63342'});

io.on('connection', (socket) => {
    console.log(socket.id)

    socket.emit('event', {img: 'https://i.ytimg.com/vi/1Ne1hqOXKKI/maxresdefault.jpg'})

    socket.on('click', (data) => {
        new Promise(resolve => {
            setTimeout(() => {
                console.log('GO ');
                resolve();
            }, 2000)
        })
            .then(() => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        console.log('Go');
                        resolve();
                    }, 2000)
                })
            }).then(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('Go');
                    resolve();
                }, 2000)
            })
        })

    })

    socket.on('room:join', (roomInfo) => {
        socket.join(roomInfo.roomID);

        socket.to(roomInfo.roomID).emit('room:remember', {id: socket.id})
    })
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use('*', (req, res) => {
    res.status(404).json('Router not found');
})

app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            error: err.message || 'Unknown Error',
            code: err.status || 500,
        })
})

server.listen(config.SERVER_PORT, () => {
    console.log(`Server listen port ${config.SERVER_PORT}`)
})