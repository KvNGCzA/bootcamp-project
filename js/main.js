'use strict';

/** add page-title as a class to the body tag */
var bodyTag = document.getElementsByTagName('body')[0];
// const currentPageTitle = document.title;
// const cName = dashTitle(currentPageTitle);
// bodyTag.classList += `page-${cName} `;

// add logged-in or logged-out class to body
var status = localStorage.getItem('token');
if (status !== 'null') {
	bodyTag.classList += ' logged-in';
	var profileLink = document.getElementsByClassName('profile-link');
	var username = localStorage.getItem('username');
	var profileimage = localStorage.getItem('profileimage');
	for (var x = 0; x < profileLink.length; x++) {
		profileLink[x].setAttribute('href', '/profile?username=' + String(username));
	}
	document.getElementsByClassName('profile-image')[0].style.backgroundImage = 'url(\'images/' + String(profileimage) + '\')';
} else {
	bodyTag.classList += ' logged-out';
}

/** action buttons config */
var actionBtnArr = ['far fa-thumbs-up likebutton', 'far fa-thumbs-down dislikebutton', 'far fa-flag reportbutton', 'far fa-star favoritebutton'];
var thinClass = ['far fa-thumbs-up likebutton', 'far fa-thumbs-down dislikebutton', 'far fa-flag reportbutton', 'far fa-star favoritebutton'];
var thickClass = ['fas fa-thumbs-up likebutton', 'fas fa-thumbs-down dislikebutton', 'fas fa-flag reportbutton', 'fas fa-star favoritebutton'];

var _loop = function () {
	function _loop(_x) {
		var current = document.getElementsByClassName(actionBtnArr[_x]);
		for (var _y = 0; _y < current.length; _y++) {
			current[_y].addEventListener('click', function () {
				var currentClass = this.getAttribute('class');
				if (currentClass === thinClass[_x]) {
					this.setAttribute('class', thickClass[_x]);
				} else {
					this.setAttribute('class', thinClass[_x]);
				}
			}, false);
		}
	}

	return _loop;
}();

for (var _x in actionBtnArr) {
	_loop(_x);
}

/** comments list background color */
var comments = document.getElementsByClassName('comment-cont');
for (var _x2 in comments) {
	if (_x2 % 2 === 0) {
		comments[_x2].style.backgroundColor = '#f4f4f4';
	}
}

/** colour for question meta - views, likes and answered if count is greater than 0 */
var homeAnswered = document.getElementsByClassName('answer-count-dis');
var homeLiked = document.getElementsByClassName('likes-count-dis');
var homeViews = document.getElementsByClassName('views-count-dis');

var countArr = [homeAnswered, homeLiked, homeViews];
var classCountArr = ['answered', 'liked', 'viewed'];
for (var y in countArr) {
	for (var _x3 in countArr[y]) {
		var _current = Number(countArr[y][_x3].textContent);
		if (_current > 0) {
			countArr[y][_x3].classList += ' ' + String(classCountArr[y]);
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
var checkWhichForm = function () {
	function checkWhichForm(login, signup) {
		if (login.style.display === 'none') {
			signup.style.display = 'none';
			login.style.display = 'block';
		} else {
			signup.style.display = 'block';
			login.style.display = 'none';
		}
	}

	return checkWhichForm;
}(); // checkWhichForm

var _loop2 = function () {
	function _loop2(_x4) {
		var loginCheck = document.getElementById(loginCheckArr[_x4]);
		var signupCheck = document.getElementById(signupCheckArr[_x4]);
		var loginButton = document.getElementById(changeButtons[_x4]);
		var signupButton = document.getElementById(changeButtons2[_x4]);
		if (loginButton && signupButton) {
			loginButton.addEventListener('click', function () {
				checkWhichForm(loginCheck, signupCheck);
			}, false);
			signupButton.addEventListener('click', function () {
				checkWhichForm(loginCheck, signupCheck);
			}, false);
		}
	}

	return _loop2;
}();

for (var _x4 in loginCheckArr) {
	_loop2(_x4);
}