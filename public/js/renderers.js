'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// render question metadata single question page
var renderQuestionMeta_singleQuestion = function () {
	function renderQuestionMeta_singleQuestion(title, answersCount, likes, dislikes) {
		var likesCount = void 0;
		var dislikesCount = void 0;
		likes !== null ? likesCount = likes.length : likesCount = 0;
		dislikes !== null ? dislikesCount = dislikes.length : dislikesCount = 0;
		document.title = 'Question - ' + String(title);
		document.getElementsByClassName('question-title')[0].textContent = title;
		document.getElementsByClassName('q-meta')[0].innerHTML = '<ul><li class="answer-count">\n      <a href="#">Answers</a><a href="#" class="answer-count-dis">' + String(answersCount) + '</a>\n  </li><!--\n  --><li class="likes-count">\n      <a href="#">UpVotes</a><a href="#" class="likes-count-dis">' + String(likesCount) + '</a>\n  </li><!--\n  --><li class="views-count">\n      <a href="#">DownVotes</a><a href="#" class="views-count-dis">' + String(dislikesCount) + '</a>\n  </li></ul>';
	}

	return renderQuestionMeta_singleQuestion;
}();

// render question single question page
var renderQuestionBody_singleQuestion = function () {
	function renderQuestionBody_singleQuestion(id, content, username, createdAt, likes, dislikes) {
		document.getElementsByClassName('question-body')[0].textContent = content;document.getElementsByClassName('action-meta-cont')[0].innerHTML = '<div class="action-buttons"></div><!--action buttons--><!--\n  --><div class="meta-cont"><span class="date-posted"></span>\n  <ul class="tags"></ul>\n  </div><!--meta cont -->';
		if (localStorage.getItem('username') !== username) {
			document.getElementsByClassName('action-buttons')[0].innerHTML = '\n      <span class="like-question action like-btn" title="Like" onclick="likeQuestion(' + String(id) + ')">\n      <i class="far fa-thumbs-up likebutton"></i>\n      </span><!--\n      --><span class="dislike-question action dislike-btn" title="Dislike" onclick="dislikeQuestion(' + String(id) + ')">\n      <i class="far fa-thumbs-down dislikebutton"></i>\n      </span><!--\n      --><span class="report action report-btn" title="Mark as Inappropriate">\n      <i class="far fa-flag reportbutton"></i>\n      </span>';
		} else {
			document.getElementsByClassName('meta-cont')[0].style.width = '100%';
		}
		document.getElementsByClassName('date-posted')[0].innerHTML = '<span>' + String(formatDate(createdAt)) + '</span> by <span><a href="/profile?username=' + String(username) + '">@' + String(username) + '</a></span>';
		if (likes !== null && likes.indexOf(localStorage.getItem('username')) !== -1) {
			var likeBtn = document.getElementsByClassName('far fa-thumbs-up likebutton')[0];
			likeBtn.classList = 'fas fa-thumbs-up likebutton';
		}if (dislikes !== null && dislikes.indexOf(localStorage.getItem('username')) !== -1) {
			var dislikeBtn = document.getElementsByClassName('far fa-thumbs-down dislikebutton')[0];
			dislikeBtn.classList = 'fas fa-thumbs-down dislikebutton';
		}
	}

	return renderQuestionBody_singleQuestion;
}();

// render comments on single question page
var renderComments_singleQuestion = function () {
	function renderComments_singleQuestion(answers, uname) {
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
				likes !== null ? likesCount = likes.length : likesCount = 0;
				dislikes !== null ? dislikesCount = dislikes.length : dislikesCount = 0;
				commentsList.innerHTML += '\n\t\t\t<li class="comment-cont">\n\t\t\t<p class="comment">' + String(answer) + '</p>\n\t\t\t<p class="action-buttons">\n\t\t\t\t<span class="like-comment action like-btn" title="Like" onclick="likeAnswer(' + String(id) + ')">\n\t\t\t\t<i class="far fa-thumbs-up likebutton"></i>\n\t\t\t\t</span><!--\n\t\t\t\t--><span class="dislike-comment action dislike-btn" title="Dislike" onclick="dislikeAnswer(' + String(id) + ')">\n\t\t\t\t<i class="far fa-thumbs-down dislikebutton"></i>\n\t\t\t\t</span><!--\n\t\t\t\t--><span class="report action report-btn" title="Mark as Inappropriate">\n\t\t\t\t<i class="far fa-flag reportbutton"></i>\n\t\t\t\t</span><!--\n\t\t\t--></p>\n\t\t\t<div class="likes-dislikes-cont"><span class="answer-likes-count">upvotes: ' + String(likesCount) + '</span><span class="answer-dislikes-count">downvotes: ' + String(dislikesCount) + '</span></div>\n\t\t\t<span class="com-meta">answer posted by <a href="/profile?username=' + String(username) + '">@' + String(username) + '</a> on <a href="#">' + String(formatDate(created_at)) + '</a></span>\n\t\t\t</li>';

				// render already liked buttons
				if (likes !== null && likes.indexOf(localStorage.getItem('username')) !== -1) {
					document.getElementsByClassName('like-comment')[x].innerHTML = '<i class="fas fa-thumbs-up likebutton"></i>';
				}

				// render already disliked buttons
				if (dislikes !== null && dislikes.indexOf(localStorage.getItem('username')) !== -1) {
					document.getElementsByClassName('dislike-comment')[x].innerHTML = '<i class="fas fa-thumbs-down dislikebutton"></i>';
				}

				// render favorite buttons
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
		} else {
			commentsList.innerHTML += '<li>No answers posted yet</li><br><br>';
		}
	}

	return renderComments_singleQuestion;
}();

// render question cards
var renderQuestionTemplates = function () {
	function renderQuestionTemplates(questions) {
		var tagsArr = [];
		var tab1 = document.getElementById('tab1');
		var tab2 = document.getElementById('tab2');
		var tabArr = [tab1, tab2];
		for (var i in questions) {
			for (var x in questions[i]) {
				var _questions$i$x = questions[i][x],
				    answers_count = _questions$i$x.answers_count,
				    likes = _questions$i$x.likes,
				    dislikes = _questions$i$x.dislikes,
				    title = _questions$i$x.title,
				    created_at = _questions$i$x.created_at,
				    id = _questions$i$x.id,
				    username = _questions$i$x.username,
				    tags = _questions$i$x.tags;

				var likesCount = void 0;
				var dislikesCount = void 0;
				likes !== null ? likesCount = likes.length : likesCount = 0;
				dislikes !== null ? dislikesCount = dislikes.length : dislikesCount = 0;
				var newDate = formatDate(created_at);
				tagsArr.push([tags.split(',')]);
				tabArr[i].innerHTML += '<div class="single-question">\n\t\t\t  <div class="q-meta">\n\t\t\t  <ul>\n\t\t\t\t  <li class="answer-count">\n\t\t\t\t  <a href="#">Answers</a>\n\t\t\t\t  <a href="#" class="answer-count-dis">' + String(answers_count) + '</a>\n\t\t\t\t  </li><!--\n\t\t\t\t  --><li class="likes-count">\n\t\t\t\t  <a href="#">UpVotes</a>\n\t\t\t\t  <a href="#" class="likes-count-dis">' + String(likesCount) + '</a>\n\t\t\t\t  </li><!--\n\t\t\t\t  --><li class="views-count">\n\t\t\t\t  <a href="#">DownVotes</a>\n\t\t\t\t  <a href="#" class="views-count-dis">' + String(dislikesCount) + '</a>\n\t\t\t\t  </li>\n\t\t\t  </ul>\n\t\t\t  </div>\n\t\n\t\t\t  <div class="q-details">\n\t\t\t  <div class="edit-option-container">\n\t\t\t  </div>\n\t\t\t  <p class="question-title"><a href="/question?id=' + String(id) + '" class="gotoQ">' + String(title) + '</a></p>\n\t\t\t  <ul class="tags">                    \n\t\t\t  </ul>\n\t\t\t  <span class="posted-on">Posted on <a href="#">' + String(newDate) + '\n\t\t\t\t  </a> by <a href="/profile?username=' + String(username) + '">@' + String(username) + '</a>\n\t\t\t  </span>\n\t\t\t  </div>\n\t\t  </div><!-- single-question -->';
			}
		}
		addTags(tagsArr);
	}

	return renderQuestionTemplates;
}();

// render a users question cards
var renderUsersQuestions = function () {
	function renderUsersQuestions(questions, uname) {
		var tagsArr = [];
		var idArr = [];
		var mostRecent = document.getElementById('most-recent');
		var mostAnswered = document.getElementById('most-answered');
		var contArr = [mostRecent, mostAnswered];
		for (var i in questions) {
			for (var x in questions[i]) {
				var _questions$i$x2 = questions[i][x],
				    answers_count = _questions$i$x2.answers_count,
				    likes = _questions$i$x2.likes,
				    dislikes = _questions$i$x2.dislikes,
				    title = _questions$i$x2.title,
				    created_at = _questions$i$x2.created_at,
				    username = _questions$i$x2.username,
				    tags = _questions$i$x2.tags,
				    id = _questions$i$x2.id;

				tagsArr.push([tags.split(',')]);
				idArr.push(id);
				var newDate = formatDate(created_at);
				var likesCount = void 0;
				var dislikesCount = void 0;
				likes !== null ? likesCount = likes.length : likesCount = 0;
				dislikes !== null ? dislikesCount = dislikes.length : dislikesCount = 0;
				contArr[i].innerHTML += '<div class="single-question">\n\t\t  <div class="q-meta">\n\t\t  <ul>\n\t\t\t  <li class="answer-count">\n\t\t\t  <a href="#">Answers</a>\n\t\t\t  <a href="#" class="answer-count-dis">' + String(answers_count) + '</a>\n\t\t\t  </li><!--\n\t\t\t  --><li class="likes-count">\n\t\t\t  <a href="#">UpVotes</a>\n\t\t\t  <a href="#" class="likes-count-dis">' + String(likesCount) + '</a>\n\t\t\t  </li><!--\n\t\t\t  --><li class="views-count">\n\t\t\t  <a href="#">DownVotes</a>\n\t\t\t  <a href="#" class="views-count-dis">' + String(dislikesCount) + '</a>\n\t\t\t  </li>\n\t\t  </ul>\n\t\t  </div>\n\t\n\t\t  <div class="q-details">\n\t\t  <div class="edit-option-container">\n\t\t  </div>\n\t\t  <p class="question-title"><a href="/question?id=' + String(id) + '">' + String(title) + '</a></p>\n\t\t  <ul class="tags">\n\t\t  </ul>\n\t\t\t  <span class="posted-on">Posted on <a href="#">' + String(newDate) + '</a> by @' + String(username) + ' </span>\n\t\t  </div>\n\t\n\t   </div><!-- single-question -->';
			}
		} // for i
		if (uname === localStorage.getItem('username')) {
			var edit = document.getElementsByClassName('edit-option-container');
			for (var _x = 0; _x < edit.length; _x++) {
				edit[_x].innerHTML = '<span class="edit-option" ><i class="fas fa-wrench"></i></span>\n          <ul class="drop-settings">\n          <li class="deleteButton"><i class="far fa-trash-alt" title="Delete this question"></i> Delete</li>\n          <li><i class="fas fa-wrench"></i> Edit</li>\n          </ul>';
			}
			editButton();
			deleteButtonFunction(idArr);
		}
		addTags(tagsArr);
	}

	return renderUsersQuestions;
}();