const express = require('express');
const path = require('path');

// Set up server
const app = express();

app.use(express.static('public', {
  extensions: ['html']
}));

module.exports = app;
