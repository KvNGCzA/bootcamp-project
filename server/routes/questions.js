'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _question = require('../controllers/question');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var router = _express2['default'].Router();

var QuestionClass = new _question.Question();

// get all questions
router.get('/', QuestionClass.getAllQuestions);

router.get('/:questionId', QuestionClass.getQuestionsById);

// post question
router.post('/', QuestionClass.createNewQuestion);

// post an answer
router.post('/:questionId/answers', QuestionClass.postAnswer);

// edit question details
router.patch('/:questionId', QuestionClass.editQuestion);

// delete a question
router['delete']('/:questionId', QuestionClass.deleteQuestion);

exports['default'] = router;