import 'babel-polyfill';

import React from 'react';
import Freezer from 'freezer-js';

import {clientRenderer} from 'react-universal-renderer';

import App from './App';

// Get the initial state from the server
let store = new Freezer(window.__FREEZER || {});

// Setting state different to what the server rendered will trigger a warning...
//let store = new Freezer({message:'Bad Message'});

clientRenderer(<App store={store} />);

console.log('Loaded Client');