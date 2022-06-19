const express = require("express");
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://VadymVinnichuk:1t2t3t4t5t@cluster0.jdrlr.mongodb.net/users');

const {usersRoute} = require("./routes/users.route");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', usersRoute);

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

app.listen(5000, () => {
    console.log('Server start host 5000')
})