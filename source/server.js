import Express from 'express';
import React from 'react';
import path from 'path';
import Freezer from 'freezer-js';
import { serverRenderer } from 'react-universal-renderer';
import App from './App';


const express = new Express();

// Build client.js script here
express.use(Express.static(path.join(__dirname, '../public'), {
  index: false
}));

// Something to fetch async
express.get('/message', function(req, res, next) {
  res.json({
    message: 'Hello from an async request!'
  });
});

// Render React App
express.get('*', function(req, res, next) {

  // Setup a store, the initial state of the store should be the same on the server and client.
  let store = new Freezer({});

  // Tell the server what and how to load state into the client, in this case just call get on the store which will set `window.__FREEZER=store.get()`
  let states = {
    '__FREEZER': store.get
  };

  // Tell the server how to load the client script
  serverRenderer(<App store={store} />, states, '/scripts/client.js', (err, html) => {
    if (err) {
      return next(err);
    }

    res.send(html);
  });
});

// Run the server
express.listen(8080);
