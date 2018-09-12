(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _functions = require('../public/js/functions');

/** add page-title as a class to the body tag */
var bodyTag = document.getElementsByTagName('body')[0];
var currentPageTitle = document.title;
var cName = (0, _functions.dashTitle)(currentPageTitle);
bodyTag.classList += 'page-' + String(cName) + ' ';

// add logged-in or logged-out class to body
var status = localStorage.getItem('token');
if (status !== null) {
	bodyTag.classList += 'logged-in';
	var profilePage = document.getElementsByClassName('page-profile')[0];
	if (profilePage) {
		// add users information from database
		var names = document.getElementsByClassName('profile-full-name');
		var uname = document.getElementsByClassName('profile-username');
		var member = document.getElementsByClassName('profile-msince');
		var asked = document.getElementsByClassName('profile-num-que');
		var answered = document.getElementsByClassName('profile-num-ans');
		var job = document.getElementsByClassName('profile-occupation');
		for (var x = 0; x < names.length; x++) {
			var fullName = localStorage.getItem('fullname');
			var username = localStorage.getItem('username');
			var memSince = localStorage.getItem('created_at');
			var aksedNum = localStorage.getItem('asked_count');
			var ansNum = localStorage.getItem('answered_count');
			var occupation = localStorage.getItem('occupation');
			names[x].textContent = fullName;
			uname[x].innerHTML = '<i class="fas fa-user" ></i> @' + String(username);
			member[x].innerHTML = '<i class="fas fa-user" ></i> ' + String(memSince);
			asked[x].innerHTML = '<i class="fas fa-question"></i><span> Asked:</span> ' + String(aksedNum);
			answered[x].innerHTML = '<i class="fas fa-check"></i><span> Replied:</span> ' + String(ansNum);
			job[x].innerHTML = '<i class="fas fa-suitcase" ></i> ' + String(occupation);
		}
	}
}
if (status === null) {
	bodyTag.classList += 'logged-out';
}

var logout = document.getElementsByClassName('logout');
var logoutUser = function logoutUser() {
	localStorage.clear();
	if (currentPageTitle === 'Profile') {
		window.location.href = '/';
	} else {
		document.location.reload();
	}
};
for (var _x = 0; _x < logout.length; _x++) {
	logout[_x].addEventListener('click', logoutUser, false);
}
/** action buttons config */
var actionBtnArr = ['far fa-thumbs-up likebutton', 'far fa-thumbs-down dislikebutton', 'far fa-flag reportbutton', 'far fa-star favoritebutton'];
var thinClass = ['far fa-thumbs-up likebutton', 'far fa-thumbs-down dislikebutton', 'far fa-flag reportbutton', 'far fa-star favoritebutton'];
var thickClass = ['fas fa-thumbs-up likebutton', 'fas fa-thumbs-down dislikebutton', 'fas fa-flag reportbutton', 'fas fa-star favoritebutton'];

var _loop = function _loop(_x2) {
	var current = document.getElementsByClassName(actionBtnArr[_x2]);
	for (var _y = 0; _y < current.length; _y++) {
		current[_y].addEventListener('click', function () {
			var currentClass = this.getAttribute('class');
			if (currentClass === thinClass[_x2]) {
				this.setAttribute('class', thickClass[_x2]);
			} else {
				this.setAttribute('class', thinClass[_x2]);
			}
		}, false);
	}
};

for (var _x2 in actionBtnArr) {
	_loop(_x2);
}

/** comments list background color */
var comments = document.getElementsByClassName('comment-cont');
for (var _x3 in comments) {
	if (_x3 % 2 === 0) {
		comments[_x3].style.backgroundColor = '#f4f4f4';
	}
}

/** colour for question meta - views, likes and answered if count is greater than 0 */
var homeAnswered = document.getElementsByClassName('answer-count-dis');
var homeLiked = document.getElementsByClassName('likes-count-dis');
var homeViews = document.getElementsByClassName('views-count-dis');

var countArr = [homeAnswered, homeLiked, homeViews];
var classCountArr = ['answered', 'liked', 'viewed'];
for (var y in countArr) {
	for (var _x4 in countArr[y]) {
		var _current = Number(countArr[y][_x4].textContent);
		if (_current > 0) {
			countArr[y][_x4].classList += ' ' + String(classCountArr[y]);
		} // if
	} // for x
} // for y


// mobile search configuration
var mobSearchIcon = document.getElementById('fa-search');
var searchForm = document.getElementsByClassName('mob-search-form');
var searchFormInput = document.getElementsByClassName('search-form-input');
mobSearchIcon.addEventListener('click', function () {
	if (searchForm[0].style.display === 'block') {
		mobSearchIcon.style.color = 'white';
		searchForm[0].style.display = 'none';
	} else {
		mobSearchIcon.style.color = '#f24d4d';
		searchForm[0].style.display = 'block';
	}
}, false);
searchFormInput[0].addEventListener('blur', function () {
	searchForm[0].style.display = 'none';
	mobSearchIcon.style.color = 'white';
}, false);

/** functions the display either login or sign up forms */
var loginCheckArr = ['login-form', 'side-login-form'];
var signupCheckArr = ['signup-form', 'side-signup-form'];
var changeButtons = ['c-t-login', 's-t-login'];
var changeButtons2 = ['c-t-signup', 's-t-signup'];
var checkWhichForm = function checkWhichForm(login, signup) {
	if (login.style.display === 'none') {
		signup.style.display = 'none';
		login.style.display = 'block';
	} else {
		signup.style.display = 'block';
		login.style.display = 'none';
	}
}; // checkWhichForm

var _loop2 = function _loop2(_x5) {
	var loginCheck = document.getElementById(loginCheckArr[_x5]);
	var signupCheck = document.getElementById(signupCheckArr[_x5]);
	var loginButton = document.getElementById(changeButtons[_x5]);
	var signupButton = document.getElementById(changeButtons2[_x5]);
	if (loginButton && signupButton) {
		loginButton.addEventListener('click', function () {
			checkWhichForm(loginCheck, signupCheck);
		}, false);
		signupButton.addEventListener('click', function () {
			checkWhichForm(loginCheck, signupCheck);
		}, false);
	}
};

for (var _x5 in loginCheckArr) {
	_loop2(_x5);
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

var deleteButton = exports.deleteButton = function deleteButton(idArr) {
  var deleteButton = document.getElementsByClassName('deleteButton');

  var _loop = function _loop(x) {
    deleteButton[x].addEventListener('click', function () {
      deleteQuestion(idArr[x]);
    }, false);
  };

  for (var x = 0; x < deleteButton.length; x++) {
    _loop(x);
  }
}; // deleteButton
},{}]},{},[1]);
