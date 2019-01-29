require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// mongodb config
require('./config/db');

// Routes

// Initializing express app
const app = express();

const NotificationsRouter = require('./src/routes/notification');
const SubscribersRouter = require('./src/routes/subscriber');

// Body Parser Configuration
app.use(bodyParser.json({ // to support JSON-encoded bodies
  limit: '1mb'
}));

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  limit: '1mb',
  extended: true
}));

// Router Initialization
app.get('/api/', (req, res) => {
  res.status(200).json({
    msg: 'Welcome to Notifications-Subscribers API'
  });
});

app.use('/api/notification/', NotificationsRouter);
app.use('/api/subscriber/', SubscribersRouter);

// Insert Seed Data to DB
// require('./bootstrap/fillSeedData')();

module.exports = app;
