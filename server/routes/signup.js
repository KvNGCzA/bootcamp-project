'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _signup = require('../controllers/signup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var userClass = new _signup.User();

var router = _express2['default'].Router();

router.get('/', userClass.fetchUsers);

router.post('/', userClass.createUser);

exports['default'] = router;