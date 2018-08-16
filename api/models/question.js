'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editQuestion = exports.deleteQuestion = exports.postAnswer = exports.getQuestionById = exports.createNewQuestion = exports.fetchQuestions = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var fetchQuestions = exports.fetchQuestions = function fetchQuestions() {
  try {
    var questionDatabase = _fs2['default'].readFileSync('server/db/questions.json');
    return JSON.parse(questionDatabase);
  } catch (error) {
    return [];
  }
};

var saveQuestion = function saveQuestion(questions) {
  _fs2['default'].writeFileSync('server/db/questions.json', JSON.stringify(questions, undefined, 2));
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

var postAnswer = exports.postAnswer = function postAnswer(questionId, answer, callback) {
  if (!answer) {
    return callback({ status: 404, message: 'Missing answer property' });
  }
  var allQuestions = fetchQuestions();
  var question = allQuestions.filter(function (question) {
    return question.questionId === questionId;
  });
  if (question.length === 0) {
    return callback({ status: 404, message: 'Question id is invalid' });
  }
  var otherQuestions = allQuestions.filter(function (question) {
    return question.questionId !== questionId;
  });
  question[0].answer.unshift(answer);
  otherQuestions.push(question[0]);
  saveQuestion(otherQuestions);
  return callback(undefined, { status: 201, message: 'Answer added' });
};

var deleteQuestion = exports.deleteQuestion = function deleteQuestion(questionId, callback) {
  var allQuestions = fetchQuestions();
  var removeQuestion = allQuestions.filter(function (question) {
    return question.questionId !== questionId;
  });
  if (allQuestions.length === removeQuestion.length) {
    return callback({ status: 404, message: 'Invalid question id' });
  }
  saveQuestion(removeQuestion);
  callback(undefined, { status: 200, message: 'Question deleted' });
};

var editQuestion = exports.editQuestion = function editQuestion(questionId, prop, newProp, callback) {
  if (!prop) {
    return callback({ status: 404, message: 'Missing prop property' });
  } else if (!newProp) {
    return callback({ status: 404, message: 'Missing newProp property' });
  }
  var allQuestions = fetchQuestions();
  var duplicateQuestion = allQuestions.filter(function (question) {
    return question.questionId === questionId;
  });
  var otherQuestions = allQuestions.filter(function (question) {
    return question.questionId !== questionId;
  });
  if (duplicateQuestion < 1) {
    return callback({ status: 404, message: 'Question id is invalid' });
  } else if (duplicateQuestion > 1) {
    return callback({ status: 404, message: 'More than one quetion exists with this id' });
  }
  duplicateQuestion[0][prop] = newProp;
  otherQuestions.push(duplicateQuestion[0]);
  saveQuestion(otherQuestions);
  callback(undefined, { status: 200, message: 'Question ' + String(prop) + ' updated' });
};