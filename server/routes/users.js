'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('../controllers/user');

var _checkAuth = require('../auth/check-auth');

var _checkAuth2 = _interopRequireDefault(_checkAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var userClass = new _user.User();

var router = _express2['default'].Router();

router.get('/users', _checkAuth2['default'], userClass.fetchUsers);

router.post('/signup', userClass.createUser);

router.post('/login', userClass.login);

exports['default'] = router;