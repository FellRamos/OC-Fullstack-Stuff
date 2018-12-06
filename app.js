// mongoDB password: TGbAWFgMfc03b03P
// mongoDB connection: mongodb+srv://Fell:<PASSWORD>@cluster0-gztad.mongodb.net/test?retryWrites=true
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routesStuff = require('./routes/stuff');

const app = express();

//Mongoose connection:
mongoose.connect('mongodb+srv://Fell:TGbAWFgMfc03b03P@cluster0-gztad.mongodb.net/test?retryWrites=true')
.then(() => {
  console.log("Successfully connected to MongoDB Atlas")
})
.catch((error) => {
  console.log("Unable to connect to MondoDB");
  console.error(error);
});


// This is to allow CROS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin' , '*');
  res.setHeader('Access-Control-Allow-Headers' , 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods' , 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// We will use the json method of the bodyParser Object
app.use(bodyParser.json());

app.use('/api/stuff', routesStuff);

module.exports = app;