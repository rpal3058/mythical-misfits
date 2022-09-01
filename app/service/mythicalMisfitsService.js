const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./mythicalMisfitsRoute.js');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(userRoutes);

app.use((err, req, res, next) => {
  let code = 500;
  let message = 'Something went wrong.';
  if (err.code) {
    code = err.code;
  }
  if (err.message) {
    message = err.message;
  }
  res.status(code).json({ message: message });
});
