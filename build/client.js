'use strict';

require('babel-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _freezerJs = require('freezer-js');

var _freezerJs2 = _interopRequireDefault(_freezerJs);

var _reactUniversalRenderer = require('react-universal-renderer');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Get the initial state from the server
var store = new _freezerJs2.default(window.__FREEZER || {});

// Setting state different to what the server rendered will trigger a warning...
//let store = new Freezer({message:'Bad Message'});

(0, _reactUniversalRenderer.clientRenderer)(_react2.default.createElement(_App2.default, { store: store }));

console.log('Loaded Client');
//# sourceMappingURL=client.js.map