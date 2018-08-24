'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _questions = require('./routes/questions');

var _questions2 = _interopRequireDefault(_questions);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _sqlquestion = require('./routes/sqlquestion');

var _sqlquestion2 = _interopRequireDefault(_sqlquestion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var port = process.env.PORT || 3000;

// start express server
var app = (0, _express2['default'])();

app.use((0, _morgan2['default'])('dev'));
app.use(_bodyParser2['default'].urlencoded({ extended: false }));
app.use(_bodyParser2['default'].json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// questions api route
app.use('/api/v1/questions', _questions2['default']);
app.use('/auth', _users2['default']);
app.use('/questions', _sqlquestion2['default']);

// link to static directory
app.use(_express2['default']['static'](_path2['default'].join(__dirname, '..', '..', 'public')));

// error codes
app.use(function (req, res, next) {
  var error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use(function (error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
      status: error.status
    }
  });
});

if (!module.parent) {
  app.listen(port, function () {
    console.log('server is up on port ' + String(port));
  });
}

exports['default'] = app;