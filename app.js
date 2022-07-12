const express = require('express');
const expressFileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require("path");
const cors = require('cors');

require('dotenv').config({path: path.join(process.cwd(), 'environments', `${process.env.MODE}.env`)});

const {config} = require("./constants");
const {userRouter, authRouter} = require('./routes');
const cronRun = require('./crons');

mongoose.connect(config.URL_DB);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

if (config.NODE_ENV !== 'prod') {
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

app.use(cors(_configureCors()));
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

app.listen(config.PORT, () => {
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