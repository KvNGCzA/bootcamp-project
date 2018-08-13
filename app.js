'use strict';

var express = require('express');
var hbs = require('hbs');
var port = process.env.PORT || 3000;

var app = express();
app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', function () {
    return new Date().getFullYear();
});

app.set('view engine', 'hbs');

var pagesArr = ['Home', 'Profile', 'Question', 'Post A Question', 'Login-SignUp'];

app.get('/', function (req, res) {
    res.render('index.hbs', {
        pageTitle: pagesArr[0]
    });
});

app.get('/profile', function (req, res) {
    res.render('profile.hbs', {
        pageTitle: pagesArr[1]
    });
});

app.get('/question', function (req, res) {
    res.render('question.hbs', {
        pageTitle: pagesArr[2]
    });
});

app.get('/post-question', function (req, res) {
    res.render('post-question.hbs', {
        pageTitle: pagesArr[3]
    });
});

app.get('/login-signup', function (req, res) {
    res.render('login-signup.hbs', {
        pageTitle: pagesArr[4]
    });
});

app.listen(port, function () {
    console.log('server is up on port ' + port);
});