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

var commentForm = document.getElementsByClassName('comment-form')[0];
var postAnswer = function postAnswer(_e) {
    _e.preventDefault();
    var token = localStorage.getItem('token');
    var newAnswer = {
        answer: commentForm.answer.value,
        token: token
    };
    console.log(newAnswer);
    var questionId = window.location.search.split('=')[1];
    fetch('http://localhost:3000/api/v2/questions/' + String(questionId) + '/answers', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAnswer)
    }).then(function (res) {
        return res.json();
    }).then(function (data) {
        document.getElementById('success-answer').textContent = data.message;
    })['catch'](function (error) {
        return console.log(error);
    });
};
commentForm.addEventListener('submit', postAnswer, false);
var getQuestionById = function getQuestionById() {
    var questionId = window.location.search.split('=')[1];
    fetch('http://localhost:3000/api/v2/questions/' + String(questionId)).then(function (res) {
        return res.json();
    }).then(function (data) {
        console.log(data);
        var tagsArr = [];
        var question = data.question,
            answers = data.answers;
        var _question$ = question[0],
            title = _question$.title,
            content = _question$.content,
            tags = _question$.tags,
            created_at = _question$.created_at,
            likes = _question$.likes,
            username = _question$.username,
            answers_count = _question$.answers_count;

        tagsArr.push([tags.split(',')]);
        document.getElementsByClassName('question-title')[0].textContent = title;
        document.getElementsByClassName('q-meta')[0].innerHTML = '<ul>\n          <li class="answer-count">\n            <a href="#">Answers</a>\n            <a href="#" class="answer-count-dis">' + String(answers_count) + '</a>\n          </li><!--\n          --><li class="likes-count">\n            <a href="#">Likes</a>\n            <a href="#" class="likes-count-dis">' + String(likes) + '</a>\n          </li><!--\n          --><li class="views-count">\n            <a href="#">Views</a>\n            <a href="#" class="views-count-dis">0</a>\n          </li>\n        </ul>';
        document.getElementsByClassName('question-body')[0].textContent = content;
        document.getElementsByClassName('date-posted')[0].innerHTML = '<span>' + String((0, _functions.formatDate)(created_at)) + '</span> by <span><a href="#">@' + String(username) + '</a></span>';
        (0, _functions.addTags)(tagsArr);
        (0, _functions.countClassColours)();
    })['catch'](function (error) {
        return console.log(error);
    });
}; // get question by id

var getQuestions = function getQuestions() {
    fetch('http://localhost:3000/api/v2/questions').then(function (res) {
        return res.json();
    }).then(function (data) {
        var questions = data.questions;

        var tagsArr = [];
        var idArr = [];
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

            var newDate = (0, _functions.formatDate)(created_at);
            tagsArr.push([tags.split(',')]);
            tab.innerHTML += '<div class="single-question">\n                <div class="q-meta">\n                <ul>\n                    <li class="answer-count">\n                    <a href="#">Answers</a>\n                    <a href="#" class="answer-count-dis">' + String(answers_count) + '</a>\n                    </li><!--\n                    --><li class="likes-count">\n                    <a href="#">Likes</a>\n                    <a href="#" class="likes-count-dis">' + String(likes) + '</a>\n                    </li><!--\n                    --><li class="views-count">\n                    <a href="#">Views</a>\n                    <a href="#" class="views-count-dis">0</a>\n                    </li>\n                </ul>\n                </div>\n\n                <div class="q-details">\n                <p class="question-title"><a href="/question?id=' + String(id) + '" class="gotoQ">' + String(title) + '</a></p>\n                <ul class="tags">                    \n                </ul>\n                    <span class="posted-on">Posted on <a href="#">' + String(newDate) + '</a> by ' + String(username) + ' </span>\n                </div>\n\n             </div><!-- single-question -->';
        }

        (0, _functions.countClassColours)();

        (0, _functions.addTags)(tagsArr);
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
    fetch('http://localhost:3000/api/v2/questions/' + String(username) + '/questions').then(function (res) {
        return res.json();
    }).then(function (data) {
        var questions = data.questions;

        var tagsArr = [];
        var idArr = [];
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
            profilePage.innerHTML += '<div class="single-question">\n                <div class="q-meta">\n                <ul>\n                    <li class="answer-count">\n                    <a href="#">Answers</a>\n                    <a href="#" class="answer-count-dis">' + String(answers_count) + '</a>\n                    </li><!--\n                    --><li class="likes-count">\n                    <a href="#">Likes</a>\n                    <a href="#" class="likes-count-dis">' + String(likes) + '</a>\n                    </li><!--\n                    --><li class="views-count">\n                    <a href="#">Views</a>\n                    <a href="#" class="views-count-dis">0</a>\n                    </li>\n                </ul>\n                </div>\n\n                <div class="q-details">\n                <div class="edit-option-container">\n                    <span class="edit-option" id=""><i class="fas fa-wrench"></i></span>\n                    <ul class="drop-settings">\n                    <li class="deleteButton"><i class="far fa-trash-alt" title="Delete this question"></i> Delete</li>\n                    <li><i class="fas fa-wrench"></i> Edit</li>\n                    </ul>\n                </div>\n                <p class="question-title"><a href="/question?id=' + String(id) + '">' + String(title) + '</a></p>\n                <ul class="tags">\n                </ul>\n                    <span class="posted-on">Posted on <a href="#">' + String(newDate) + '</a> by ' + String(_username) + ' </span>\n                </div>\n\n             </div><!-- single-question -->';
        }
        (0, _functions.deleteButton)(idArr);
        (0, _functions.countClassColours)();
        (0, _functions.addTags)(tagsArr);
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

if (document.title === 'Question') {
    getQuestionById();
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
