'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Question = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('../utils/utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Question = exports.Question = function () {
	function Question() {
		_classCallCheck(this, Question);
	}

	_createClass(Question, [{
		key: 'getAllQuestions',

		// get all questions
		value: function () {
			function getAllQuestions(req, res) {
				return res.status(200).json(_utils.allQuestions);
			}

			return getAllQuestions;
		}()

		// create a new question

	}, {
		key: 'createNewQuestion',
		value: function () {
			function createNewQuestion(req, res) {
				if (!req.body.title) {
					return res.status(400).json({ status: 400, message: 'Title can not be empty' });
				}
				if (!req.body.content) {
					return res.status(400).json({ status: 400, message: 'Content can not be empty' });
				}
				var questionId = 'question' + String(_utils.allQuestions.length + 1);
				var newQuestion = {
					questionId: questionId,
					title: req.body.title.trim(),
					content: req.body.content.trim(),
					answer: []
				};
				_utils.allQuestions.push(newQuestion);
				(0, _utils.saveQuestion)(_utils.allQuestions);
				return res.status(201).json({ status: 201, result: 'Question added' });
			}

			return createNewQuestion;
		}()

		// get a question by its Id

	}, {
		key: 'getQuestionsById',
		value: function () {
			function getQuestionsById(req, res) {
				var questionId = req.params.questionId;

				var question = _utils.allQuestions.filter(function (singleQuestion) {
					return singleQuestion.questionId === questionId;
				});
				if (question.length !== 0) {
					console.log('if not empty: ', question);
					return res.status(200).json({ question: question[0] });
				}
				console.log('if empty', question);
				return res.status(404).json({ message: 'Invalid question id' });
			}

			return getQuestionsById;
		}()

		//post an answer to a question

	}, {
		key: 'postAnswer',
		value: function () {
			function postAnswer(req, res) {
				if (!req.body.answer) {
					return res.status(404).json({ status: 404, message: 'Missing answer property' });
				}
				var dupQuestions = _utils.allQuestions.filter(function (question) {
					return question.questionId === req.params.questionId;
				});
				if (dupQuestions.length === 0) {
					return res.status(404).json({ status: 404, message: 'Question id is invalid' });
				}
				var otherQuestions = _utils.allQuestions.filter(function (question) {
					return question.questionId !== req.params.questionId;
				});
				dupQuestions[0].answer.unshift(req.body.answer);
				otherQuestions.push(dupQuestions[0]);
				(0, _utils.saveQuestion)(otherQuestions);
				return res.status(201).json({ status: 201, message: 'Answer added' });
			}

			return postAnswer;
		}()

		// edit a question

	}, {
		key: 'editQuestion',
		value: function () {
			function editQuestion(req, res) {
				if (!req.body.prop) {
					return res.status(404).json({ status: 404, message: 'Missing prop property' });
				}
				if (!req.body.newProp) {
					return res.status(404).json({ status: 404, message: 'Missing newProp property' });
				}
				var duplicateQuestion = _utils.allQuestions.filter(function (question) {
					return question.questionId === req.params.questionId;
				});
				var otherQuestions = _utils.allQuestions.filter(function (question) {
					return question.questionId !== req.params.questionId;
				});
				if (duplicateQuestion < 1) {
					return res.status(404).json({ status: 404, message: 'Question id is invalid' });
				}
				duplicateQuestion[0][req.body.prop] = req.body.newProp;
				otherQuestions.push(duplicateQuestion[0]);
				(0, _utils.saveQuestion)(otherQuestions);
				return res.status(201).json({ status: 201, message: 'Question ' + String(req.body.prop) + ' updated' });
			}

			return editQuestion;
		}()

		// delete a guestion by its id

	}, {
		key: 'deleteQuestion',
		value: function () {
			function deleteQuestion(req, res) {
				var removeQuestion = _utils.allQuestions.filter(function (question) {
					return question.questionId !== req.params.questionId;
				});
				if (_utils.allQuestions.length === removeQuestion.length) {
					return res.status(404).json({ status: 404, message: 'Invalid question id' });
				}
				(0, _utils.saveQuestion)(removeQuestion);
				return res.status(200).json({ status: 200, message: 'Question deleted' });
			}

			return deleteQuestion;
		}()
	}]);

	return Question;
}();