'use strict';

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
        var username = data.profile.username;
        var token = data.token;

        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
        window.location.href = './profile?username=' + String(username);
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
        var username = data.profile.username;
        var token = data.token;

        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
        window.location.href = './profile?username=' + String(username);
        return;
      }
      return warning.textContent = 'username/password do not match';
    })['catch'](function (error) {
      return error;
    });
  };
  loginForm.addEventListener('submit', loginUser, false);
}