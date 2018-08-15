'use strict';

/** add page-title as a class to the body tag*/
var dashTitle = function dashTitle(str) {
  if (/\s/.test(str)) {
    var lowerStr = str.toLowerCase();
    var strArr = lowerStr.split(' ');
    return strArr.join('-');
  }
  return str.toLowerCase();
};
var bodyTag = document.getElementsByTagName('body');
var currentPageTitle = document.title;
var cName = dashTitle(currentPageTitle);
bodyTag[0].classList += 'page-' + cName + ' ';

/** action buttons config*/
var actionBtnArr = ['far fa-thumbs-up likebutton', 'far fa-thumbs-down dislikebutton', 'far fa-flag reportbutton', 'far fa-star favoritebutton'];
var thinClass = ['far fa-thumbs-up likebutton', 'far fa-thumbs-down dislikebutton', 'far fa-flag reportbutton', 'far fa-star favoritebutton'];
var thickClass = ['fas fa-thumbs-up likebutton', 'fas fa-thumbs-down dislikebutton', 'fas fa-flag reportbutton', 'fas fa-star favoritebutton'];

var _loop = function _loop(x) {
  var current = document.getElementsByClassName(actionBtnArr[x]);
  for (var _y = 0; _y < current.length; _y++) {
    current[_y].addEventListener('click', function () {
      var currentClass = this.getAttribute('class');
      if (currentClass === thinClass[x]) {
        this.setAttribute('class', thickClass[x]);
      } else {
        this.setAttribute('class', thinClass[x]);
      }
    }, false);
  }
};

for (var x in actionBtnArr) {
  _loop(x);
}

/** comments list background color */
var comments = document.getElementsByClassName('comment-cont');
for (var x in comments) {
  if (x % 2 === 0) {
    comments[x].style.backgroundColor = '#f4f4f4';
  }
}

/** colour for question meta - views, likes and answered if count is greater than 0*/
var homeAnswered = document.getElementsByClassName('answer-count-dis');
var homeLiked = document.getElementsByClassName('likes-count-dis');
var homeViews = document.getElementsByClassName('views-count-dis');
var countArr = [homeAnswered, homeLiked, homeViews];
var classCountArr = ['answered', 'liked', 'viewed'];
for (var y in countArr) {
  for (var _x in countArr[y]) {
    var _current = Number(countArr[y][_x].textContent);
    if (_current > 0) {
      countArr[y][_x].classList += ' ' + classCountArr[y];
    } //if
  } //for x
} //for y


/** mobile search configuration*/
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

/** functions the display either login or sign up forms*/
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
}; //checkWhichForm

var _loop2 = function _loop2(_x2) {
  var loginCheck = document.getElementById(loginCheckArr[_x2]);
  var signupCheck = document.getElementById(signupCheckArr[_x2]);
  var loginButton = document.getElementById(changeButtons[_x2]);
  var signupButton = document.getElementById(changeButtons2[_x2]);
  if (loginButton && signupButton) {
    loginButton.addEventListener('click', function () {
      checkWhichForm(loginCheck, signupCheck);
    }, false);
    signupButton.addEventListener('click', function () {
      checkWhichForm(loginCheck, signupCheck);
    }, false);
  }
};

for (var _x2 in loginCheckArr) {
  _loop2(_x2);
}