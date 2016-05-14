'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _freezerJs = require('freezer-js');

var _freezerJs2 = _interopRequireDefault(_freezerJs);

var _reactUniversalRenderer = require('react-universal-renderer');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = new _express2.default();

// Build client.js script here
express.use(_express2.default.static(_path2.default.join(__dirname, '../public'), {
  index: false
}));

// Something to fetch async
express.get('/message', function (req, res, next) {
  res.json({
    message: 'Hello from an async request!'
  });
});

// Render React App
express.get('*', function (req, res, next) {

  // Setup a store, the initial state of the store should be the same on the server and client.
  var store = new _freezerJs2.default({});

  // Tell the server what and how to load state into the client, in this case just call get on the store which will set `window.__FREEZER=store.get()`
  var states = {
    '__FREEZER': store.get
  };

  // Tell the server how to load the client script
  (0, _reactUniversalRenderer.serverRenderer)(_react2.default.createElement(_App2.default, { store: store }), states, '/scripts/client.js', function (err, html) {
    if (err) {
      return next(err);
    }

    res.send(html);
  });
});

// Run the server
express.listen(8080);
//# sourceMappingURL=server.js.map