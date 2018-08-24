'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
require('dotenv').config();
var pgp = require('pg-promise')();
var db = exports.db = pgp(process.env.DB);