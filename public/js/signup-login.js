'use strict';

var formatDate = function formatDate(date) {
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
if (typeof document !== 'undefined') {
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

          var newDate = formatDate(created_at);
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
              answered_count = _data$profile2.answered_count,
              asked_count = _data$profile2.asked_count,
              created_at = _data$profile2.created_at,
              email = _data$profile2.email,
              fullname = _data$profile2.fullname,
              username = _data$profile2.username,
              occupation = _data$profile2.occupation;
          var token = data.token;

          var newDate = formatDate(created_at);
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
} // type of document

module.exports = {
  formatDate: formatDate
};