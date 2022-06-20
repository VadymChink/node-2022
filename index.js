const express = require('express');
const mongoose = require('mongoose');

const {userRouter} = require("./routes");

mongoose.connect('mongodb+srv://VadymVinnichuk:1t2t3t4t5t@cluster0.jdrlr.mongodb.net/users');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/users',userRouter);

app.use('*',(req, res)=>{
    res.status(404).json('Router not found')
})

app.use((err,req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            error:err.message || 'Unknown Error',
            code: err.status || 500,
        })
})

app.listen(5000, () => {
    console.log('Server start port 5000')
})