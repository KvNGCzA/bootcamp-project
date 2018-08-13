'use strict';

var fs = require('fs');

var fetch = function fetch() {
  try {
    var userDataBase = fs.readFileSync('users.json');
    return JSON.parse(userDataBase);
  } catch (error) {
    return [];
  }
};
var save = function save(user) {
  fs.writeFileSync('users.json', JSON.stringify(user));
};

var createUser = function createUser(fname, lname, mail, uname, pwd) {
  var currentUsers = fetch();
  var userObj = {
    fname: fname,
    lname: lname,
    mail: mail,
    uname: uname,
    pwd: pwd,
    userID: ' user' + (fetch().length + 1)
  };

  if (currentUsers.length === 0) {
    currentUsers.push(userObj);
    save(currentUsers);
    console.log("User created");
  } else if (checkEmail(mail) && checkUsername(uname)) {
    currentUsers.push(userObj);
    save(currentUsers);
    console.log("User created");
  }
};

var checkEmail = function checkEmail(mail) {
  var currentUsers = fetch();
  if (currentUsers.filter(function (user) {
    return user.mail === mail;
  }).length === 0) {
    return true;
  } else {
    console.log("user mail already exists");
    return false;
  }
};

var checkUsername = function checkUsername(username) {
  var currentUsers = fetch();
  if (currentUsers.filter(function (user) {
    return user.uname === username;
  }).length === 0) {
    return true;
  } else {
    console.log("username already exists");
    return false;
  }
};

module.exports = {
  createUser: createUser
};