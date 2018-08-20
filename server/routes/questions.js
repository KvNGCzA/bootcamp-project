'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _question = require('../controllers/question');

var question = _interopRequireWildcard(_question);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var router = _express2['default'].Router();

// get all questions
router.get('/', function (req, res, next) {
	var allQuestions = question.fetchQuestions();
	res.status(200).json(allQuestions);
});

// get question by id
router.get('/:questionId', question.getQuestionsById);

// post question
router.post('/', function (req, res, next) {
	question.createNewQuestion(req.body.title, req.body.content, function (errorMessage, result) {
		if (errorMessage) {
			return res.status(400).json(errorMessage);
		}
		return res.status(201).json(result);
	});
});

// post an answer
router.post('/:questionId/answers', function (req, res, next) {
	question.postAnswer(req.params.questionId, req.body.answer, function (errorMessage, result) {
		if (errorMessage) {
			return res.status(404).json(errorMessage);
		}
		return res.status(201).json(result);
	});
});

// edit question details
router.patch('/:questionId', function (req, res, next) {
	question.editQuestion(req.params.questionId, req.body.prop, req.body.newProp, function (errorMessage, result) {
		if (errorMessage) {
			return res.status(404).json(errorMessage);
		}
		return res.status(201).json(result);
	});
});

// delete a question
router['delete']('/:questionId', function (req, res, next) {
	question.deleteQuestion(req.params.questionId, function (errorMessage, result) {
		if (errorMessage) {
			return res.status(404).json(errorMessage);
		}
		return res.status(200).json(result);
	});
});

exports['default'] = router;