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