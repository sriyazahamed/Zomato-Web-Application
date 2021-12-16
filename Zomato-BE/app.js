const express = require('express');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const app=express();
const router= require('./Routes/routes');
require('dotenv').config();

const port=process.env.PORT ||3333;
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.use('/', router);
mongoose.connect(
    'mongodb+srv://zomato:abcde@cluster0.08q3u.mongodb.net/zomato-data?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(success => {
    app.listen(port, () => {
        console.log(`Server is up and running on port: ${port}`);
    })

}).catch(err => {
    console.log('Error connecting to MongoDB : ' + err);
});