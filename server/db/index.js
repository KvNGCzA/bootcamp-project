'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
require('dotenv').config();
var pgp = require('pg-promise')();
var db = exports.db = pgp('postgresql://CzA:King301094@localhost:5432/stackoverflow');