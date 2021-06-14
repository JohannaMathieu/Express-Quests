//connect with db
const connection = require("./db-config");
// Setup the environement variables from an .env file
require('dotenv').config();

// Import express
const express = require('express');

//import Joi (validation API)
const Joi = require('joi');

// We store all express methods in a variable called app
const app = express();

//parse json
app.use(express.json());

//setting up seperate route files
const { setupRoutes } = require('./routes');

setupRoutes(app);

// If an environment variable name PORT exists, we take it in order to let the user change the port without changing the source code. Otherwise we give a default value of 3000
const port = process.env.PORT || 3000;

// We listen to incoming request on the port defined above
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } else {
    console.log('connected to database with threadId :  ' + connection.threadId);
  }
});
app.use(express.json());

/*  */