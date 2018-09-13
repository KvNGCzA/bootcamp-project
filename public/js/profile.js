(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _functions = require('../public/js/functions');

var fetchUserInfo = function fetchUserInfo() {
    var uname = window.location.search.split('=')[1];
    fetch('http://localhost:3000/api/v2/auth/user/' + String(uname)).then(function (res) {
        return res.json();
    }).then(function (data) {
        var _data$user$ = data.user[0],
            username = _data$user$.username,
            fullname = _data$user$.fullname,
            created_at = _data$user$.created_at,
            asked_count = _data$user$.asked_count,
            answered_count = _data$user$.answered_count,
            occupation = _data$user$.occupation;
        // add users information from database

        for (var x = 0; x < document.getElementsByClassName('profile-full-name').length; x++) {
            document.getElementsByClassName('profile-full-name')[x].textContent = fullname;
            document.getElementsByClassName('profile-username')[x].innerHTML = '<i class="fas fa-user" ></i> @' + String(username);
            document.getElementsByClassName('profile-msince')[x].innerHTML = '<i class="fas fa-user" ></i> ' + String((0, _functions.formatDate)(created_at));
            document.getElementsByClassName('profile-num-que')[x].innerHTML = '<i class="fas fa-question"></i><span> Asked:</span> ' + String(asked_count);
            document.getElementsByClassName('profile-num-ans')[x].innerHTML = '<i class="fas fa-check"></i><span> Replied:</span> ' + String(answered_count);
            document.getElementsByClassName('profile-occupation')[x].innerHTML = '<i class="fas fa-suitcase" ></i> ' + String(occupation);
        }
    })['catch'](function (error) {
        return error;
    });
};

if (document.title === 'Profile') {
    fetchUserInfo();
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

var countClassColours = exports.countClassColours = function countClassColours() {
  /** colour for question meta - views, likes and answered if count is greater than 0 */
  var homeAnswered = document.getElementsByClassName('answer-count-dis');
  var homeLiked = document.getElementsByClassName('likes-count-dis');
  var homeViews = document.getElementsByClassName('views-count-dis');

  var countArr = [homeAnswered, homeLiked, homeViews];
  var classCountArr = ['answered', 'liked', 'viewed'];
  for (var y in countArr) {
    for (var x in countArr[y]) {
      var current = Number(countArr[y][x].textContent);
      if (current > 0) {
        countArr[y][x].classList += ' ' + String(classCountArr[y]);
      } // if
    } // for x
  } // for y
}; // countClassColours

var addTags = exports.addTags = function addTags(tagsArr) {
  // add tags to questions
  var tag = document.getElementsByClassName('tags');
  for (var x = 0; x < tag.length; x++) {
    for (var y in tagsArr[x]) {
      for (var z in tagsArr[x][y]) {
        tag[x].innerHTML += '<li><a href="#">' + String(tagsArr[x][y][z]) + '</a></li>';
      }
    }
  }
}; // addTags

/** comments list background color */
var colorComments = exports.colorComments = function colorComments() {
  var comments = document.getElementsByClassName('comment-cont');
  for (var x in comments) {
    if (x % 2 === 0) {
      comments[x].style.backgroundColor = '#f4f4f4';
    }
  }
};
},{}]},{},[1]);
