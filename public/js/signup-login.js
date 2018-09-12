(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _functions = require('../public/js/functions');

var body = document.getElementsByTagName('body')[0];
if (body.classList.contains('page-login-signup')) {
  var signupForm = document.getElementById('su-form');

  var createUser = function createUser(_e) {
    _e.preventDefault();
    var warning = document.getElementById('warning-message');
    var newUser = {
      firstName: signupForm.fname.value,
      lastName: signupForm.lname.value,
      occupation: signupForm.occupation.value,
      password: signupForm.pwd.value,
      email: signupForm.email.value,
      username: signupForm.username.value
    };
    fetch('http://localhost:3000/api/v2/auth/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      var message = data.message;
      if (message === 'user created') {
        var _data$profile = data.profile,
            answered_count = _data$profile.answered_count,
            asked_count = _data$profile.asked_count,
            created_at = _data$profile.created_at,
            email = _data$profile.email,
            fullname = _data$profile.fullname,
            username = _data$profile.username,
            occupation = _data$profile.occupation;
        var token = data.token;

        var newDate = (0, _functions.formatDate)(created_at);
        localStorage.setItem('fullname', fullname);
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('occupation', occupation);
        localStorage.setItem('answered_count', answered_count);
        localStorage.setItem('asked_count', asked_count);
        localStorage.setItem('created_at', newDate);
        localStorage.setItem('token', token);
        window.location.href = './profile';
        return;
      }
      return warning.textContent = message;
    })['catch'](function (err) {
      return err;
    });
  };

  signupForm.addEventListener('submit', createUser, false);

  var loginForm = document.getElementById('lg-form');

  var loginUser = function loginUser(_e) {
    _e.preventDefault();
    var warning = document.getElementById('warning-message2');
    var user = {
      email: loginForm.email.value,
      password: loginForm.pwd.value
    };
    fetch('http://localhost:3000/api/v2/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      var message = data.message;
      if (message === "successfully logged in!") {
        var _data$profile2 = data.profile,
            id = _data$profile2.id,
            answered_count = _data$profile2.answered_count,
            asked_count = _data$profile2.asked_count,
            created_at = _data$profile2.created_at,
            email = _data$profile2.email,
            fullname = _data$profile2.fullname,
            username = _data$profile2.username,
            occupation = _data$profile2.occupation;

        console.log('id', id);
        var token = data.token;

        var newDate = (0, _functions.formatDate)(created_at);
        localStorage.setItem('fullname', fullname);
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('occupation', occupation);
        localStorage.setItem('answered_count', answered_count);
        localStorage.setItem('asked_count', asked_count);
        localStorage.setItem('created_at', newDate);
        localStorage.setItem('token', token);
        window.location.href = './profile';
        return;
      }
      return warning.textContent = 'username/password do not match';
    })['catch'](function (error) {
      return error;
    });
  };

  loginForm.addEventListener('submit', loginUser, false);
}
},{"../public/js/functions":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var dashTitle = exports.dashTitle = function dashTitle(str) {
  if (/\s/.test(str)) {
    var lowerStr = str.toLowerCase();
    var strArr = lowerStr.split(' ');
    return strArr.join('-');
  }
  return str.toLowerCase();
};

var formatDate = exports.formatDate = function formatDate(date) {
  var day = date.slice(8, 10);
  var monthNumber = date.slice(5, 7);
  var month = void 0;
  if (monthNumber[0] === '0') {
    month = monthNumber[1] - 1;
  } else {
    month = monthNumber - 1;
  }
  var year = date.slice(0, 4);
  var monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var newMonth = monthArray[month];
  var newDate = String(day) + ' ' + String(newMonth) + ' ' + String(year);
  return newDate;
};
},{}]},{},[1]);
