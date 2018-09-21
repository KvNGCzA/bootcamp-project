'use strict';

var dashTitle = function () {
	function dashTitle(str) {
		if (/\s/.test(str)) {
			var lowerStr = str.toLowerCase();
			var strArr = lowerStr.split(' ');
			return strArr.join('-');
		}
		return str.toLowerCase();
	}

	return dashTitle;
}();

var formatDate = function () {
	function formatDate(date) {
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
	}

	return formatDate;
}();

// deleteButtonFunction
var deleteButtonFunction = function () {
	function deleteButtonFunction(idArr) {
		var deleteButton = document.getElementsByClassName('deleteButton');

		var _loop = function () {
			function _loop(x) {
				deleteButton[x].addEventListener('click', function () {
					deleteQuestion(idArr[x]);
				}, false);
			}

			return _loop;
		}();

		for (var x = 0; x < deleteButton.length; x++) {
			_loop(x);
		}
	}

	return deleteButtonFunction;
}(); // deleteButtonFunction

var editButton = function () {
	function editButton() {
		var editOption = document.getElementsByClassName('edit-option');

		var _loop2 = function () {
			function _loop2(x) {
				editOption[x].addEventListener('click', function () {
					var nextSibling = editOption[x].nextElementSibling;
					if (nextSibling.style.display === 'block') {
						nextSibling.style.display = 'none';
					} else {
						nextSibling.style.display = 'block';
					}
				}, false);
			}

			return _loop2;
		}();

		for (var x = 0; x < editOption.length; x++) {
			_loop2(x);
		}
	}

	return editButton;
}();

// countClassColours
var countClassColours = function () {
	function countClassColours() {
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
	}

	return countClassColours;
}(); // countClassColours

// addTags
var addTags = function () {
	function addTags(tagsArr) {
		// add tags to questions
		var tag = document.getElementsByClassName('tags');
		for (var x = 0; x < tag.length; x++) {
			for (var y in tagsArr[x]) {
				for (var z in tagsArr[x][y]) {
					if (tagsArr[x][y][z].trim() !== '') {
						tag[x].innerHTML += '<li><a href="#">' + String(tagsArr[x][y][z]) + '</a></li>';
					}
				}
			}
		}
	}

	return addTags;
}(); // addTags

/** comments list background color */
var colorComments = function () {
	function colorComments() {
		var comments = document.getElementsByClassName('comment-cont');
		for (var x in comments) {
			if (x % 2 === 0) {
				comments[x].style.backgroundColor = '#f4f4f4';
			}
		}
	}

	return colorComments;
}();

// behaviour of like, dislike, flag, and favorite buttons
var actionButtons = function () {
	function actionButtons() {
		/** action buttons config */
		var actionBtnArr = ['fa-thumbs-up likebutton', 'fa-thumbs-down dislikebutton', 'fa-flag reportbutton', 'fa-star favoritebutton'];
		var thinClass = ['far fa-thumbs-up likebutton', 'far fa-thumbs-down dislikebutton', 'far fa-flag reportbutton', 'far fa-star favoritebutton'];
		var thickClass = ['fas fa-thumbs-up likebutton', 'fas fa-thumbs-down dislikebutton', 'fas fa-flag reportbutton', 'fas fa-star favoritebutton'];

		var _loop3 = function () {
			function _loop3(x) {
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
			}

			return _loop3;
		}();

		for (var x in actionBtnArr) {
			_loop3(x);
		}
	}

	return actionButtons;
}();