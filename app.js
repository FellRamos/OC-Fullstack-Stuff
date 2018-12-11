
// mongoDB connection: mongodb+srv://Fell:<PASSWORD>@cluster0-gztad.mongodb.net/test?retryWrites=true

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const app = express();

//Mongoose connection:
mongoose.connect(`mongodb+srv://Fell:${process.env.PASSWORD}@cluster0-gztad.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true })
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

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
