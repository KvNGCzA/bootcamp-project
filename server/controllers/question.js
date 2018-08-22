'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Question = exports.fetchQuestions = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fetchQuestions = exports.fetchQuestions = function fetchQuestions() {
	try {
		var questionDatabase = _fs2['default'].readFileSync('server/db/questions.json');
		return JSON.parse(questionDatabase);
	} catch (error) {
		return [];
	}
};

var saveQuestion = function saveQuestion(questions) {
	return _fs2['default'].writeFileSync('server/db/questions.json', JSON.stringify(questions, undefined, 2));
};
var allQuestions = fetchQuestions();

var Question = exports.Question = function () {
	function Question() {
		_classCallCheck(this, Question);
	}

	_createClass(Question, [{
		key: 'getAllQuestions',

		// get all questions
		value: function () {
			function getAllQuestions(req, res) {
				return res.status(200).json(allQuestions);
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
				var questionId = 'question' + String(allQuestions.length + 1);
				var newQuestion = {
					questionId: questionId,
					title: req.body.title.trim(),
					content: req.body.content.trim(),
					answer: []
				};
				allQuestions.push(newQuestion);
				saveQuestion(allQuestions);
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

				var question = allQuestions.filter(function (singleQuestion) {
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
				var dupQuestions = allQuestions.filter(function (question) {
					return question.questionId === req.params.questionId;
				});
				if (dupQuestions.length === 0) {
					return res.status(404).json({ status: 404, message: 'Question id is invalid' });
				}
				var otherQuestions = allQuestions.filter(function (question) {
					return question.questionId !== req.params.questionId;
				});
				dupQuestions[0].answer.unshift(req.body.answer);
				otherQuestions.push(dupQuestions[0]);
				saveQuestion(otherQuestions);
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
				var duplicateQuestion = allQuestions.filter(function (question) {
					return question.questionId === req.params.questionId;
				});
				var otherQuestions = allQuestions.filter(function (question) {
					return question.questionId !== req.params.questionId;
				});
				if (duplicateQuestion < 1) {
					return res.status(404).json({ status: 404, message: 'Question id is invalid' });
				}
				duplicateQuestion[0][req.body.prop] = req.body.newProp;
				otherQuestions.push(duplicateQuestion[0]);
				saveQuestion(otherQuestions);
				return res.status(201).json({ status: 201, message: 'Question ' + String(req.body.prop) + ' updated' });
			}

			return editQuestion;
		}()

		// delete a guestion by its id

	}, {
		key: 'deleteQuestion',
		value: function () {
			function deleteQuestion(req, res) {
				var removeQuestion = allQuestions.filter(function (question) {
					return question.questionId !== req.params.questionId;
				});
				if (allQuestions.length === removeQuestion.length) {
					return res.status(404).json({ status: 404, message: 'Invalid question id' });
				}
				saveQuestion(removeQuestion);
				return res.status(200).json({ status: 200, message: 'Question deleted' });
			}

			return deleteQuestion;
		}()
	}]);

	return Question;
}();