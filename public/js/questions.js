'use strict';

var formNum = 0;
var allQuestionForms = document.getElementsByClassName('postquestionform');
if (allQuestionForms.length > 1) {
	formNum = 1;
}
var questionForms = document.getElementsByClassName('postquestionform')[formNum];
var postQuestion = function () {
	function postQuestion(_e) {
		_e.preventDefault();
		var token = localStorage.getItem('token');
		var newQuestion = {
			title: questionForms.title.value,
			content: questionForms.content.value,
			tags: questionForms.tags.value,
			token: token
		};
		fetch('https://safe-inlet-99347.herokuapp.com/api/v2/questions', {
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
				fetch('https://safe-inlet-99347.herokuapp.com/api/v2/auth/users').then(function (res) {
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
					return error;
				});
			} else {
				successMessage.textContent = data.message;
			}
		})['catch'](function (error) {
			return error;
		});
	}

	return postQuestion;
}(); // post a question function
questionForms.addEventListener('submit', postQuestion, false);

var likeQuestion = function () {
	function likeQuestion(questionId) {
		var token = localStorage.getItem('token');
		fetch('https://safe-inlet-99347.herokuapp.com/api/v2/questions/' + String(questionId) + '/like', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({ token: token })
		}).then(function (res) {
			return res.json();
		}).then(function () {
			return window.location.reload();
		})['catch'](function (error) {
			return console.log(error);
		});
	}

	return likeQuestion;
}();

var dislikeQuestion = function () {
	function dislikeQuestion(questionId) {
		var token = localStorage.getItem('token');
		fetch('https://safe-inlet-99347.herokuapp.com/api/v2/questions/' + String(questionId) + '/dislike', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({ token: token })
		}).then(function (res) {
			return res.json();
		}).then(function () {
			return window.location.reload();
		})['catch'](function (error) {
			return console.log(error);
		});
	}

	return dislikeQuestion;
}();

var getQuestionById = function () {
	function getQuestionById() {
		var questionId = window.location.search.split('=')[1];
		fetch('https://safe-inlet-99347.herokuapp.com/api/v2/questions/' + String(questionId)).then(function (res) {
			return res.json();
		}).then(function (data) {
			var tagsArr = [];
			var question = data.question,
			    answers = data.answers;
			var _question$ = question[0],
			    id = _question$.id,
			    title = _question$.title,
			    content = _question$.content,
			    tags = _question$.tags,
			    created_at = _question$.created_at,
			    likes = _question$.likes,
			    dislikes = _question$.dislikes,
			    username = _question$.username,
			    answers_count = _question$.answers_count;

			tagsArr.push([tags.split(',')]);
			renderQuestionMeta_singleQuestion(title, answers_count, likes, dislikes);
			renderQuestionBody_singleQuestion(questionId, content, username, created_at, likes, dislikes);
			addTags(tagsArr);
			countClassColours();
			renderComments_singleQuestion(answers, username);
			actionButtons();
			colorComments();
		})['catch'](function (error) {
			return error;
		});
	}

	return getQuestionById;
}(); // get question by id

var getQuestions = function () {
	function getQuestions() {
		fetch('https://safe-inlet-99347.herokuapp.com/api/v2/questions').then(function (res) {
			return res.json();
		}).then(function (data) {
			var questions = data.questions;

			renderQuestionTemplates(questions);
			countClassColours();
		})['catch'](function (error) {
			return error;
		});
	}

	return getQuestions;
}(); // get all quetsions for homepage


var getUsersQuestions = function () {
	function getUsersQuestions() {
		var uname = window.location.search.split('=')[1];
		fetch('https://safe-inlet-99347.herokuapp.com/api/v2/questions/' + String(uname) + '/questions').then(function (res) {
			return res.json();
		}).then(function (data) {
			var questions = data.questions;

			renderUsersQuestions(questions, uname);
			countClassColours();
		})['catch'](function (error) {
			return error;
		});
	}

	return getUsersQuestions;
}(); // get questions for profile page

var deleteQuestion = function () {
	function deleteQuestion(id) {
		var token = localStorage.getItem('token');
		fetch('https://safe-inlet-99347.herokuapp.com/api/v2/questions/' + String(id), {
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
	}

	return deleteQuestion;
}(); // delete a question

if (document.getElementsByTagName('body')[0].classList.contains('page-home')) {
	getQuestions();
}

if (document.getElementsByTagName('body')[0].classList.contains('page-profile')) {
	getUsersQuestions();
}

if (document.getElementsByTagName('body')[0].classList.contains('page-question')) {
	getQuestionById();
}