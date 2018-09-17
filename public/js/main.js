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
	var profileLink = document.getElementsByClassName('profile-link');
	var username = localStorage.getItem('username');
	for (var x = 0; x < profileLink.length; x++) {
		profileLink[x].setAttribute('href', '/profile?username=' + String(username));
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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

var deleteQuestion = exports.deleteQuestion = function deleteQuestion(id) {
  var token = localStorage.getItem('token');
  fetch('http://localhost:3000/api/v2/questions/' + String(id), {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: token })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    return document.location.reload();
  })['catch'](function (error) {
    return error;
  });
}; // delete a question

var deleteButtonFunction = exports.deleteButtonFunction = function deleteButtonFunction(idArr) {
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
        if (tagsArr[x][y][z].trim() !== "") {
          tag[x].innerHTML += '<li><a href="#">' + String(tagsArr[x][y][z]) + '</a></li>';
        }
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

var actionButtons = exports.actionButtons = function actionButtons() {
  /** action buttons config */
  var actionBtnArr = ['far fa-thumbs-up likebutton', 'far fa-thumbs-down dislikebutton', 'far fa-flag reportbutton', 'far fa-star favoritebutton'];
  var thinClass = ['far fa-thumbs-up likebutton', 'far fa-thumbs-down dislikebutton', 'far fa-flag reportbutton', 'far fa-star favoritebutton'];
  var thickClass = ['fas fa-thumbs-up likebutton', 'fas fa-thumbs-down dislikebutton', 'fas fa-flag reportbutton', 'fas fa-star favoritebutton'];

  var _loop2 = function _loop2(x) {
    var current = document.getElementsByClassName(actionBtnArr[x]);
    for (var y = 0; y < current.length; y++) {
      current[y].addEventListener('click', function () {
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
    _loop2(x);
  }
};

var renderQuestionMeta_singleQuestion = exports.renderQuestionMeta_singleQuestion = function renderQuestionMeta_singleQuestion(title, answersCount, likes) {
  document.getElementsByClassName('question-title')[0].textContent = title;
  document.getElementsByClassName('q-meta')[0].innerHTML = '<ul>\n  <li class="answer-count">\n      <a href="#">Answers</a>\n      <a href="#" class="answer-count-dis">' + String(answersCount) + '</a>\n  </li><!--\n  --><li class="likes-count">\n      <a href="#">Likes</a>\n      <a href="#" class="likes-count-dis">' + String(likes) + '</a>\n  </li><!--\n  --><li class="views-count">\n      <a href="#">Views</a>\n      <a href="#" class="views-count-dis">0</a>\n  </li>\n  </ul>';
};

var renderQuestionBody_singleQuestion = exports.renderQuestionBody_singleQuestion = function renderQuestionBody_singleQuestion(content, username, createdAt) {
  document.getElementsByClassName('question-body')[0].textContent = content;
  document.getElementsByClassName('action-meta-cont')[0].innerHTML = '<div class="action-buttons"></div><!--action buttons--><!--\n  --><div class="meta-cont">\n  <span class="date-posted">\n  </span>\n  <ul class="tags">\n  </ul>\n  </div><!--meta cont -->';

  if (localStorage.getItem('username') !== username) {
    document.getElementsByClassName('action-buttons')[0].innerHTML = '\n      <span class="like-comment action like-btn" title="Like">\n      <i class="far fa-thumbs-up likebutton"></i>\n      </span><!--\n      --><span class="dislike-comment action dislike-btn" title="Dislike">\n      <i class="far fa-thumbs-down dislikebutton"></i>\n      </span><!--\n      --><span class="report action report-btn" title="Mark as Inappropriate">\n      <i class="far fa-flag reportbutton"></i>\n      </span>';
  }

  document.getElementsByClassName('date-posted')[0].innerHTML = '<span>' + String(formatDate(createdAt)) + '</span> by <span><a href="/profile?username=' + String(username) + '">@' + String(username) + '</a></span>';
};

var renderComments_singleQuestion = exports.renderComments_singleQuestion = function renderComments_singleQuestion(answers, username) {
  var commentsList = document.getElementById('comment-list');
  if (answers.length > 0) {
    var favoriteAnswer = answers.filter(function (answer) {
      return answer.favorite === true;
    });
    var otherAnswers = answers.filter(function (answer) {
      return answer.favorite !== true;
    });
    var sortedAnswer = [].concat(_toConsumableArray(favoriteAnswer), _toConsumableArray(otherAnswers));
    for (var x in sortedAnswer) {
      var _sortedAnswer$x = sortedAnswer[x],
          answer = _sortedAnswer$x.answer,
          id = _sortedAnswer$x.id;

      commentsList.innerHTML += '\n        <li class="comment-cont">\n          <p class="comment">' + String(answer) + '</p>\n          <p class="action-buttons">\n              <span class="like-comment action like-btn" title="Like">\n              <i class="far fa-thumbs-up likebutton"></i>\n              </span><!--\n              --><span class="dislike-comment action dislike-btn" title="Dislike">\n              <i class="far fa-thumbs-down dislikebutton"></i>\n              </span><!--\n              --><span class="report action report-btn" title="Mark as Inappropriate">\n              <i class="far fa-flag reportbutton"></i>\n              </span><!--\n          --></p>\n        </li>';
      if (localStorage.getItem('username') === username) {
        document.getElementsByClassName('action-buttons')[Number(x) + 1].innerHTML += '<span class="favorite-comment action favorite-btn" title="Mark as favorite" onclick="favoriteAnAnswer(' + String(id) + ')">\n              <i class="far fa-star favoritebutton"></i>\n          </span>';
      }
    }

    var firstStar = document.getElementsByClassName('far fa-star favoritebutton')[0];
    if (favoriteAnswer.length > 0) {
      var firstComment = document.getElementsByClassName('comment')[0];
      var badge = document.createElement('i');
      badge.classList += 'fas fa-check-circle';
      badge.setAttribute('title', 'Favorite answer!');
      firstComment.insertBefore(badge, firstComment.firstChild);
      if (firstStar) {
        firstStar.classList = 'fas fa-star favoritebutton';
      }
    }
    actionButtons();
  } else {
    commentsList.innerHTML += '<li>No answers posted yet</li><br><br>';
  }
};

var renderQuestionTemplates = exports.renderQuestionTemplates = function renderQuestionTemplates(questions) {
  var tagsArr = [];
  for (var x = questions.length - 1; x >= 0; x--) {
    var tab = document.getElementById('tab1');
    var _questions$x = questions[x],
        answers_count = _questions$x.answers_count,
        likes = _questions$x.likes,
        title = _questions$x.title,
        created_at = _questions$x.created_at,
        id = _questions$x.id,
        username = _questions$x.username,
        tags = _questions$x.tags;

    var newDate = formatDate(created_at);
    tagsArr.push([tags.split(',')]);
    tab.innerHTML += '<div class="single-question">\n          <div class="q-meta">\n          <ul>\n              <li class="answer-count">\n              <a href="#">Answers</a>\n              <a href="#" class="answer-count-dis">' + String(answers_count) + '</a>\n              </li><!--\n              --><li class="likes-count">\n              <a href="#">Likes</a>\n              <a href="#" class="likes-count-dis">' + String(likes) + '</a>\n              </li><!--\n              --><li class="views-count">\n              <a href="#">Views</a>\n              <a href="#" class="views-count-dis">0</a>\n              </li>\n          </ul>\n          </div>\n\n          <div class="q-details">\n          <div class="edit-option-container">\n          </div>\n          <p class="question-title"><a href="/question?id=' + String(id) + '" class="gotoQ">' + String(title) + '</a></p>\n          <ul class="tags">                    \n          </ul>\n          <span class="posted-on">Posted on <a href="#">' + String(newDate) + '\n              </a> by <a href="/profile?username=' + String(username) + '">' + String(username) + '</a>\n          </span>\n          </div>\n      </div><!-- single-question -->';
  }
  addTags(tagsArr);
};

var renderUsersQuestions = exports.renderUsersQuestions = function renderUsersQuestions(questions, uname) {
  var tagsArr = [];
  var idArr = [];
  for (var x = questions.length - 1; x >= 0; x--) {
    var profilePage = document.getElementsByClassName('profile-page-cont')[0];
    var _questions$x2 = questions[x],
        answers_count = _questions$x2.answers_count,
        likes = _questions$x2.likes,
        title = _questions$x2.title,
        created_at = _questions$x2.created_at,
        username = _questions$x2.username,
        tags = _questions$x2.tags,
        id = _questions$x2.id;

    tagsArr.push([tags.split(',')]);
    idArr.push(id);
    var newDate = formatDate(created_at);
    profilePage.innerHTML += '<div class="single-question">\n      <div class="q-meta">\n      <ul>\n          <li class="answer-count">\n          <a href="#">Answers</a>\n          <a href="#" class="answer-count-dis">' + String(answers_count) + '</a>\n          </li><!--\n          --><li class="likes-count">\n          <a href="#">Likes</a>\n          <a href="#" class="likes-count-dis">' + String(likes) + '</a>\n          </li><!--\n          --><li class="views-count">\n          <a href="#">Views</a>\n          <a href="#" class="views-count-dis">0</a>\n          </li>\n      </ul>\n      </div>\n\n      <div class="q-details">\n      <div class="edit-option-container">\n      </div>\n      <p class="question-title"><a href="/question?id=' + String(id) + '">' + String(title) + '</a></p>\n      <ul class="tags">\n      </ul>\n          <span class="posted-on">Posted on <a href="#">' + String(newDate) + '</a> by ' + String(username) + ' </span>\n      </div>\n\n   </div><!-- single-question -->';
  }
  if (uname === localStorage.getItem('username')) {
    var edit = document.getElementsByClassName('edit-option-container');
    for (var _x = 0; _x < edit.length; _x++) {
      edit[_x].innerHTML = '<span class="edit-option" id=""><i class="fas fa-wrench"></i></span>\n          <ul class="drop-settings">\n          <li class="deleteButton"><i class="far fa-trash-alt" title="Delete this question"></i> Delete</li>\n          <li><i class="fas fa-wrench"></i> Edit</li>\n          </ul>';
    }
    deleteButtonFunction(idArr);
  }
  addTags(tagsArr);
};
},{}]},{},[1]);
