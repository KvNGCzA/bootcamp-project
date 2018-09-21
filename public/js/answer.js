'use strict';

var token = localStorage.getItem('token');

var commentForm = document.getElementsByClassName('comment-form')[0];
var postAnswer = function () {
	function postAnswer(_e) {
		_e.preventDefault();
		var token = localStorage.getItem('token');
		var newAnswer = {
			answer: commentForm.answer.value,
			token: token
		};
		var questionId = window.location.search.split('=')[1];
		fetch('https://safe-inlet-99347.herokuapp.com/api/v2/questions/' + String(questionId) + '/answers', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newAnswer)
		}).then(function (res) {
			return res.json();
		}).then(function (data) {
			var successAnswer = document.getElementById('success-answer');
			var message = data.message;

			successAnswer.textContent = message;
			commentForm.answer.value = '';
			if (message === 'answer posted!') {
				successAnswer.style.color = 'green';
				return setTimeout(function () {
					document.location.reload();
				}, 1000);
			}
			successAnswer.style.color = '#f24d4d';
		})['catch'](function (error) {
			return error;
		});
	}

	return postAnswer;
}();

var questionId = window.location.search.split('=')[1];
var favoriteAnAnswer = function () {
	function favoriteAnAnswer(id) {
		fetch('https://safe-inlet-99347.herokuapp.com/api/v2/questions/' + String(questionId) + '/answers/' + String(id), {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ token: token })
		}).then(function (res) {
			return res.json();
		}).then(function (data) {
			document.location.reload();
		})['catch'](function (error) {
			return error;
		});
	}

	return favoriteAnAnswer;
}();

var likeAnswer = function () {
	function likeAnswer(id) {
		fetch('https://safe-inlet-99347.herokuapp.com/api/v2/questions/answers/' + String(id) + '/like', {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
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

	return likeAnswer;
}();

var dislikeAnswer = function () {
	function dislikeAnswer(id) {
		fetch('https://safe-inlet-99347.herokuapp.com/api/v2/questions/answers/' + String(id) + '/dislike', {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ token: token })
		}).then(function (res) {
			return res.json();
		}).then(function (data) {
			return window.location.reload();
		})['catch'](function (error) {
			return console.log(error);
		});
	}

	return dislikeAnswer;
}();

if (document.getElementsByTagName('body')[0].classList.contains('page-question')) {
	commentForm.addEventListener('submit', postAnswer, false);
}