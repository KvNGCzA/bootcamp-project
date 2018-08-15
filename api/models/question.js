'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQuestionById = exports.createNewQuestion = exports.fetchQuestions = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var fetchQuestions = exports.fetchQuestions = function fetchQuestions() {
  try {
    var questionDatabase = _fs2['default'].readFileSync('databases/questions.json');
    return JSON.parse(questionDatabase);
  } catch (error) {
    return [];
  }
};

var saveQuestion = function saveQuestion(questions) {
  _fs2['default'].writeFileSync('databases/questions.json', JSON.stringify(questions, undefined, 2));
};

var createNewQuestion = exports.createNewQuestion = function createNewQuestion(title, content, callback) {
  if (!title) {
    return callback({ status: 400, message: 'Title can not be empty' });
  } else if (!content) {
    return callback({ status: 400, message: 'Content can not be empty' });
  }
  var currentQuestions = fetchQuestions();
  var questionId = 'question' + String(currentQuestions.length + 1);
  var newQuestion = {
    questionId: questionId,
    title: title.trim(),
    content: content.trim(),
    answer: []
  };
  currentQuestions.push(newQuestion);
  saveQuestion(currentQuestions);
  callback(undefined, { status: 201, result: 'Question added' });
};

var getQuestionById = exports.getQuestionById = function getQuestionById(questionId, callback) {
  var currentQuestions = fetchQuestions();
  var question = currentQuestions.filter(function (question) {
    return question.questionId === questionId;
  });
  if (question.length === 1) {
    return callback(undefined, question);
  } else if (question.length > 1) {
    return callback({ status: 404, message: 'More than one question has this id' });
  }
  return callback({ status: 404, message: 'Invalid question id' });
};