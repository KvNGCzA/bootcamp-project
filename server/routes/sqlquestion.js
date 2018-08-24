'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _checkAuth = require('../auth/check-auth');

var _checkAuth2 = _interopRequireDefault(_checkAuth);

var _sqlquestion = require('../controllers/sqlquestion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var router = _express2['default'].Router();

var questionsClass = new _sqlquestion.Questions();

router.get('/', questionsClass.fetchQuestions);

router.post('/', questionsClass.postQuestion);

exports['default'] = router;