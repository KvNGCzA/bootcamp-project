'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.app = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _hbs = require('hbs');

var _hbs2 = _interopRequireDefault(_hbs);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _questions = require('../api/routes/questions');

var _questions2 = _interopRequireDefault(_questions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var port = process.env.PORT || 3000;

/**start express server*/
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
/** questions api route*/
app.use('/api/v1/questions', _questions2['default']);

/** link to static directory*/
app.use(_express2['default']['static'](__dirname + '../../public'));

/**register hbs partials*/
_hbs2['default'].registerPartials(__dirname + '../../views/partials');
console.log('dir:' + __dirname + '../views/partials');

/**register hbs helper*/
_hbs2['default'].registerHelper('getCurrentYear', function () {
    return new Date().getFullYear();
});
/**enable hbs*/
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
    res.render('index.hbs', {
        pageTitle: 'Home'
    });
});

app.get('/profile', function (req, res) {
    res.render('profile.hbs', {
        pageTitle: 'Profile'
    });
});

app.get('/question', function (req, res) {
    res.render('question.hbs', {
        pageTitle: 'Question'
    });
});

app.get('/post-question', function (req, res) {
    res.render('post-question.hbs', {
        pageTitle: 'Post A Question'
    });
});

app.get('/login-signup', function (req, res) {
    res.render('login-signup.hbs', {
        pageTitle: 'Login-SignUp'
    });
});

/**error codes*/
app.use(function (req, res, next) {
    var error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use(function (error, req, res, next) {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

exports.app = app;


if (!module.parent) {
    app.listen(port, function () {
        console.log('server is up on port ' + String(port));
    });
}