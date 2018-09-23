'use strict';

var body = document.getElementsByTagName('body')[0];
if (body.classList.contains('page-login-signup')) {
  var signupForm = document.getElementById('su-form');
  var createUser = function () {
    function createUser(_e) {
      _e.preventDefault();
      var warning = document.getElementById('warning-message');
      var newUser = new FormData();
      var propArr = ['firstName', 'lastName', 'occupation', 'password', 'email', 'username', 'profileImage'];
      var valueArr = [signupForm.fname.value, signupForm.lname.value, signupForm.occupation.value, signupForm.pwd.value, signupForm.email.value, signupForm.username.value, signupForm.profileImage.files[0]];
      for (var x in propArr) {
        newUser.append(propArr[x], valueArr[x]);
      }
      fetch('http://localhost:3000/api/v2/auth/signup', {
        method: 'POST',
        body: newUser
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        var message = data.message;
        if (message === 'user created') {
          var _data$profile = data.profile,
              username = _data$profile.username,
              profileimage = _data$profile.profileimage;
          var token = data.token;

          localStorage.setItem('username', username);
          localStorage.setItem('profileimage', profileimage);
          localStorage.setItem('token', token);
          window.location.href = './profile?username=' + String(username);
          return;
        }return warning.textContent = message;
      })['catch'](function (err) {
        return err;
      });
    }

    return createUser;
  }();
  signupForm.addEventListener('submit', createUser, false);

  var loginForm = document.getElementById('lg-form');
  var loginUser = function () {
    function loginUser(_e) {
      _e.preventDefault();
      var warning = document.getElementById('warning-message2');
      var user = { email: loginForm.email.value, password: loginForm.pwd.value };
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
              username = _data$profile2.username,
              profileimage = _data$profile2.profileimage;
          var token = data.token;

          localStorage.setItem('username', username);
          localStorage.setItem('profileimage', profileimage);
          localStorage.setItem('token', token);
          window.location.href = './profile?username=' + String(username);
          return;
        }return warning.textContent = 'username/password do not match';
      })['catch'](function (error) {
        return error;
      });
    }

    return loginUser;
  }();
  loginForm.addEventListener('submit', loginUser, false);
}

var logout = document.getElementsByClassName('logout');
var logoutUser = function () {
  function logoutUser() {
    var token = localStorage.getItem('token');
    fetch('http://localhost:3000/api/v2/auth/logout', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: token })
    }).then(function (res) {
      return res.json();
    }).then(function () {
      localStorage.clear();
      location.reload();
    })['catch'](function (error) {
      return error;
    });
  }

  return logoutUser;
}();

for (var x = 0; x < logout.length; x++) {
  logout[x].addEventListener('click', logoutUser, false);
}