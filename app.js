const express = require('express');
const mongoose = require('mongoose');

const {userRouter, authRouter} = require('./routes');
const {config} = require("./constants");

mongoose.connect(config.DB_URL);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

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

app.listen(config.SERVER_PORT, () => {
    console.log(`Server started host ${config.SERVER_PORT}`);
});
