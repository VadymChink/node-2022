const express = require("express");
const mongoose = require('mongoose');

const {usersRouter, authRouter} = require("./routes");
const {config} = require("./constants");

mongoose.connect(config.URL_DATA_BASE);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.use('*', (req, res) => {
    res.status(404).json('Route not found')
});

app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            error:err.message || 'Unknow Error',
            code: err.status || 500
        })
})

app.listen(config.SERVER_PORT, () => {
    console.log('Server start host 5000')
})