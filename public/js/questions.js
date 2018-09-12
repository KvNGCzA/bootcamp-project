(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _functions = require('../public/js/functions');

var formNum = 0;
var allQuestionForms = document.getElementsByClassName('postquestionform');
if (allQuestionForms.length > 1) {
    formNum = 1;
}
var questionForms = document.getElementsByClassName('postquestionform')[formNum];
var postQuestion = function postQuestion(_e) {
    _e.preventDefault();
    var token = localStorage.getItem('token');
    var newQuestion = {
        title: questionForms.title.value,
        content: questionForms.content.value,
        tags: questionForms.tags.value,
        token: token
    };
    fetch('http://localhost:3000/api/v2/questions', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newQuestion)
    }).then(function (res) {
        return res.json();
    }).then(function (data) {
        var successMessage = document.getElementsByClassName('postQuestion-success-message')[formNum];
        if (data.message === 'question posted!') {
            successMessage.style.display = 'block';
            questionForms.title.value = '';
            questionForms.content.value = '';
            questionForms.tags.value = '';
            fetch('http://localhost:3000/api/v2/auth/users').then(function (res) {
                return res.json();
            }).then(function (data) {
                var uname = localStorage.getItem('username');
                var allUsers = data.users;
                var getUser = allUsers.filter(function (user) {
                    return user.username === uname;
                });
                var _getUser$ = getUser[0],
                    asked_count = _getUser$.asked_count,
                    answered_count = _getUser$.answered_count;

                localStorage.setItem('asked_count', asked_count);
                localStorage.setItem('answered_count', answered_count);
                if (document.title === 'Profile') {
                    document.location.reload();
                }
            })['catch'](function (error) {
                return console.log(error);
            });
        } else {
            successMessage.textContent = data.message;
        }
        return;
    })['catch'](function (error) {
        return console.log(error);
    });
}; // post a question function

questionForms.addEventListener('submit', postQuestion, false);

var getQuestions = function getQuestions() {
    fetch('http://localhost:3000/api/v2/questions').then(function (res) {
        return res.json();
    }).then(function (data) {
        var questions = data.questions;

        var tagsArr = [];
        for (var x = questions.length - 1; x >= 0; x--) {
            var tab = document.getElementById('tab1');
            var _questions$x = questions[x],
                answers_count = _questions$x.answers_count,
                likes = _questions$x.likes,
                title = _questions$x.title,
                created_at = _questions$x.created_at,
                username = _questions$x.username,
                tags = _questions$x.tags;

            var newDate = (0, _functions.formatDate)(created_at);
            tagsArr.push([tags.split(',')]);
            tab.innerHTML += '<div class="single-question">\n                <div class="q-meta">\n                <ul>\n                    <li class="answer-count">\n                    <a href="#">Answers</a>\n                    <a href="#" class="answer-count-dis">' + String(answers_count) + '</a>\n                    </li><!--\n                    --><li class="likes-count">\n                    <a href="#">Likes</a>\n                    <a href="#" class="likes-count-dis">' + String(likes) + '</a>\n                    </li><!--\n                    --><li class="views-count">\n                    <a href="#">Views</a>\n                    <a href="#" class="views-count-dis">0</a>\n                    </li>\n                </ul>\n                </div>\n\n                <div class="q-details">\n                <p class="question-title"><a href="/question">' + String(title) + '</a></p>\n                <ul class="tags">                    \n                </ul>\n                    <span class="posted-on">Posted on <a href="#">' + String(newDate) + '</a> by ' + String(username) + ' </span>\n                </div>\n\n             </div><!-- single-question -->';
        }

        /** colour for question meta - views, likes and answered if count is greater than 0 */
        var homeAnswered = document.getElementsByClassName('answer-count-dis');
        var homeLiked = document.getElementsByClassName('likes-count-dis');
        var homeViews = document.getElementsByClassName('views-count-dis');

        var countArr = [homeAnswered, homeLiked, homeViews];
        var classCountArr = ['answered', 'liked', 'viewed'];
        for (var y in countArr) {
            for (var _x in countArr[y]) {
                var current = Number(countArr[y][_x].textContent);
                if (current > 0) {
                    countArr[y][_x].classList += ' ' + String(classCountArr[y]);
                } // if
            } // for x
        } // for y

        // add tags to questions
        var tag = document.getElementsByClassName('tags');
        for (var _x2 = 0; _x2 < tag.length; _x2++) {
            for (var _y in tagsArr[_x2]) {
                for (var z in tagsArr[_x2][_y]) {
                    tag[_x2].innerHTML += '<li><a href="#">' + String(tagsArr[_x2][_y][z]) + '</a></li>';
                }
            }
        }
    })['catch'](function (error) {
        return console.log(error);
    });
}; // get all quetsions for homepage

var deleteQuestion = function deleteQuestion(id) {
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

var getUsersQuestions = function getUsersQuestions() {
    var username = localStorage.getItem('username');
    var idArr = [];
    fetch('http://localhost:3000/api/v2/questions/' + String(username) + '/questions').then(function (res) {
        return res.json();
    }).then(function (data) {
        var questions = data.questions;

        var tagsArr = [];
        for (var x = questions.length - 1; x >= 0; x--) {
            var profilePage = document.getElementsByClassName('profile-page-cont')[0];
            var _questions$x2 = questions[x],
                answers_count = _questions$x2.answers_count,
                likes = _questions$x2.likes,
                title = _questions$x2.title,
                created_at = _questions$x2.created_at,
                _username = _questions$x2.username,
                tags = _questions$x2.tags,
                id = _questions$x2.id;

            tagsArr.push([tags.split(',')]);
            idArr.push(id);
            var newDate = (0, _functions.formatDate)(created_at);
            profilePage.innerHTML += '<div class="single-question">\n                <div class="q-meta">\n                <ul>\n                    <li class="answer-count">\n                    <a href="#">Answers</a>\n                    <a href="#" class="answer-count-dis">' + String(answers_count) + '</a>\n                    </li><!--\n                    --><li class="likes-count">\n                    <a href="#">Likes</a>\n                    <a href="#" class="likes-count-dis">' + String(likes) + '</a>\n                    </li><!--\n                    --><li class="views-count">\n                    <a href="#">Views</a>\n                    <a href="#" class="views-count-dis">0</a>\n                    </li>\n                </ul>\n                </div>\n\n                <div class="q-details">\n                <div class="edit-option-container">\n                    <span class="edit-option" id=""><i class="fas fa-wrench"></i></span>\n                    <ul class="drop-settings">\n                    <li class="deleteButton"><i class="far fa-trash-alt" title="Delete this question"></i> Delete</li>\n                    <li><i class="fas fa-wrench"></i> Edit</li>\n                    </ul>\n                </div>\n                <p class="question-title"><a href="/question">' + String(title) + '</a></p>\n                <ul class="tags">                    \n                </ul>\n                    <span class="posted-on">Posted on <a href="#">' + String(newDate) + '</a> by ' + String(_username) + ' </span>\n                </div>\n\n             </div><!-- single-question -->';
        }
        var deleteButton = document.getElementsByClassName('deleteButton');

        var _loop = function _loop(_x3) {
            deleteButton[_x3].addEventListener('click', function () {
                deleteQuestion(idArr[_x3]);
            }, false);
        };

        for (var _x3 = 0; _x3 < deleteButton.length; _x3++) {
            _loop(_x3);
        }
        /** colour for question meta - views, likes and answered if count is greater than 0 */
        var homeAnswered = document.getElementsByClassName('answer-count-dis');
        var homeLiked = document.getElementsByClassName('likes-count-dis');
        var homeViews = document.getElementsByClassName('views-count-dis');

        var countArr = [homeAnswered, homeLiked, homeViews];
        var classCountArr = ['answered', 'liked', 'viewed'];
        for (var y in countArr) {
            for (var _x4 in countArr[y]) {
                var current = Number(countArr[y][_x4].textContent);
                if (current > 0) {
                    countArr[y][_x4].classList += ' ' + String(classCountArr[y]);
                } // if
            } // for x
        } // for y

        // add tags to questions
        var tag = document.getElementsByClassName('tags');
        for (var _x5 = 0; _x5 < tag.length; _x5++) {
            for (var _y2 in tagsArr[_x5]) {
                for (var z in tagsArr[_x5][_y2]) {
                    tag[_x5].innerHTML += '<li><a href="#">' + String(tagsArr[_x5][_y2][z]) + '</a></li>';
                }
            }
        }
    })['catch'](function (error) {
        return error;
    });
}; // get questions for profile page

if (document.title === 'Home') {
    getQuestions();
}

if (document.title === 'Profile') {
    getUsersQuestions();
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
