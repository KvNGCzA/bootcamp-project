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

// deleteButtonFunction
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
}; // deleteButtonFunction

var editButton = exports.editButton = function editButton() {
  var editOption = document.getElementsByClassName('edit-option');

  var _loop2 = function _loop2(x) {
    editOption[x].addEventListener('click', function () {
      var nextSibling = editOption[x].nextElementSibling;
      if (nextSibling.style.display === 'block') {
        nextSibling.style.display = 'none';
      } else {
        nextSibling.style.display = 'block';
      }
    }, false);
  };

  for (var x = 0; x < editOption.length; x++) {
    _loop2(x);
  }
};

// countClassColours
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

// addTags
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

// behaviour of like, dislike, flag, and favorite buttons
var actionButtons = exports.actionButtons = function actionButtons() {
  /** action buttons config */
  var actionBtnArr = ['far fa-thumbs-up likebutton', 'far fa-thumbs-down dislikebutton', 'far fa-flag reportbutton', 'far fa-star favoritebutton'];
  var thinClass = ['far fa-thumbs-up likebutton', 'far fa-thumbs-down dislikebutton', 'far fa-flag reportbutton', 'far fa-star favoritebutton'];
  var thickClass = ['fas fa-thumbs-up likebutton', 'fas fa-thumbs-down dislikebutton', 'fas fa-flag reportbutton', 'fas fa-star favoritebutton'];

  var _loop3 = function _loop3(x) {
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
    _loop3(x);
  }
};

// render question metadata single question page
var renderQuestionMeta_singleQuestion = exports.renderQuestionMeta_singleQuestion = function renderQuestionMeta_singleQuestion(title, answersCount, likes) {
  document.getElementsByClassName('question-title')[0].textContent = title;
  document.getElementsByClassName('q-meta')[0].innerHTML = '<ul>\n  <li class="answer-count">\n      <a href="#">Answers</a>\n      <a href="#" class="answer-count-dis">' + String(answersCount) + '</a>\n  </li><!--\n  --><li class="likes-count">\n      <a href="#">Likes</a>\n      <a href="#" class="likes-count-dis">' + String(likes) + '</a>\n  </li><!--\n  --><li class="views-count">\n      <a href="#">Views</a>\n      <a href="#" class="views-count-dis">0</a>\n  </li>\n  </ul>';
};

// render question single question page
var renderQuestionBody_singleQuestion = exports.renderQuestionBody_singleQuestion = function renderQuestionBody_singleQuestion(content, username, createdAt) {
  document.getElementsByClassName('question-body')[0].textContent = content;document.getElementsByClassName('action-meta-cont')[0].innerHTML = '<div class="action-buttons"></div><!--action buttons--><!--\n  --><div class="meta-cont">\n  <span class="date-posted">\n  </span>\n  <ul class="tags">\n  </ul>\n  </div><!--meta cont -->';

  if (localStorage.getItem('username') !== username) {
    document.getElementsByClassName('action-buttons')[0].innerHTML = '\n      <span class="like-comment action like-btn" title="Like">\n      <i class="far fa-thumbs-up likebutton"></i>\n      </span><!--\n      --><span class="dislike-comment action dislike-btn" title="Dislike">\n      <i class="far fa-thumbs-down dislikebutton"></i>\n      </span><!--\n      --><span class="report action report-btn" title="Mark as Inappropriate">\n      <i class="far fa-flag reportbutton"></i>\n      </span>';
  }

  document.getElementsByClassName('date-posted')[0].innerHTML = '<span>' + String(formatDate(createdAt)) + '</span> by <span><a href="/profile?username=' + String(username) + '">@' + String(username) + '</a></span>';
};

// render comments on single question page
var renderComments_singleQuestion = exports.renderComments_singleQuestion = function renderComments_singleQuestion(answers, uname) {
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
          id = _sortedAnswer$x.id,
          username = _sortedAnswer$x.username,
          created_at = _sortedAnswer$x.created_at,
          likes = _sortedAnswer$x.likes,
          dislikes = _sortedAnswer$x.dislikes;

      var likesCount = void 0;
      var dislikesCount = void 0;
      if (likes === null || likes.length < 1) {
        likesCount = 0;
      } else {
        likesCount = likes.length;
      }
      if (dislikes === null || dislikes.length < 1) {
        dislikesCount = 0;
      } else {
        dislikesCount = dislikes.length;
      }
      commentsList.innerHTML += '\n        <li class="comment-cont">\n          <p class="comment">' + String(answer) + '</p>\n          <p class="action-buttons">\n          <span class="com-meta">answer posted by <a href="/profile?username=' + String(username) + '">@' + String(username) + '</a> on <a href="#">' + String(formatDate(created_at)) + '</a></span>\n              <span class="like-comment action like-btn" title="Like">\n              <i class="far fa-thumbs-up likebutton"></i>\n              </span><!--\n              --><span class="dislike-comment action dislike-btn" title="Dislike">\n              <i class="far fa-thumbs-down dislikebutton"></i>\n              </span><!--\n              --><span class="report action report-btn" title="Mark as Inappropriate">\n              <i class="far fa-flag reportbutton"></i>\n              </span><!--\n          --></p>\n          <div class="likes-dislikes-cont"><span class="answer-likes-count">Likes: ' + String(likesCount) + '</span><span class="answer-dislikes-count">Dislikes: ' + String(dislikesCount) + '</span></div>\n        </li>';
      if (localStorage.getItem('username') === uname) {
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

// render question cards
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
    tab.innerHTML += '<div class="single-question">\n          <div class="q-meta">\n          <ul>\n              <li class="answer-count">\n              <a href="#">Answers</a>\n              <a href="#" class="answer-count-dis">' + String(answers_count) + '</a>\n              </li><!--\n              --><li class="likes-count">\n              <a href="#">Likes</a>\n              <a href="#" class="likes-count-dis">' + String(likes) + '</a>\n              </li><!--\n              --><li class="views-count">\n              <a href="#">Views</a>\n              <a href="#" class="views-count-dis">0</a>\n              </li>\n          </ul>\n          </div>\n\n          <div class="q-details">\n          <div class="edit-option-container">\n          </div>\n          <p class="question-title"><a href="/question?id=' + String(id) + '" class="gotoQ">' + String(title) + '</a></p>\n          <ul class="tags">                    \n          </ul>\n          <span class="posted-on">Posted on <a href="#">' + String(newDate) + '\n              </a> by <a href="/profile?username=' + String(username) + '">@' + String(username) + '</a>\n          </span>\n          </div>\n      </div><!-- single-question -->';
  }
  addTags(tagsArr);
};

// render a users question cards
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
    profilePage.innerHTML += '<div class="single-question">\n      <div class="q-meta">\n      <ul>\n          <li class="answer-count">\n          <a href="#">Answers</a>\n          <a href="#" class="answer-count-dis">' + String(answers_count) + '</a>\n          </li><!--\n          --><li class="likes-count">\n          <a href="#">Likes</a>\n          <a href="#" class="likes-count-dis">' + String(likes) + '</a>\n          </li><!--\n          --><li class="views-count">\n          <a href="#">Views</a>\n          <a href="#" class="views-count-dis">0</a>\n          </li>\n      </ul>\n      </div>\n\n      <div class="q-details">\n      <div class="edit-option-container">\n      </div>\n      <p class="question-title"><a href="/question?id=' + String(id) + '">' + String(title) + '</a></p>\n      <ul class="tags">\n      </ul>\n          <span class="posted-on">Posted on <a href="#">' + String(newDate) + '</a> by @' + String(username) + ' </span>\n      </div>\n\n   </div><!-- single-question -->';
  }
  if (uname === localStorage.getItem('username')) {
    var edit = document.getElementsByClassName('edit-option-container');
    for (var _x = 0; _x < edit.length; _x++) {
      edit[_x].innerHTML = '<span class="edit-option" ><i class="fas fa-wrench"></i></span>\n          <ul class="drop-settings">\n          <li class="deleteButton"><i class="far fa-trash-alt" title="Delete this question"></i> Delete</li>\n          <li><i class="fas fa-wrench"></i> Edit</li>\n          </ul>';
    }
    editButton();
    deleteButtonFunction(idArr);
  }
  addTags(tagsArr);
};