require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const {userRouter, authRouter} = require("./routes");
const {config} = require("./constants");

mongoose.connect(config.URL_DB);

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use('*', (req, res) => {
    res.status(404).json('Router not found')
})

app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            error: err.message || 'Unknown Error',
            code: err.status || 500,
        })
})

app.listen(config.PORT, () => {
    console.log('Server start port 5000')
})