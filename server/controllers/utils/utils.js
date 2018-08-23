'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.allQuestions = exports.saveQuestion = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var fetchQuestions = function fetchQuestions() {
	try {
		var questionDatabase = _fs2['default'].readFileSync('server/db/questions.json');
		return JSON.parse(questionDatabase);
	} catch (error) {
		return [];
	}
};

var saveQuestion = exports.saveQuestion = function saveQuestion(questions) {
	return _fs2['default'].writeFileSync('server/db/questions.json', JSON.stringify(questions, undefined, 2));
};

var allQuestions = exports.allQuestions = fetchQuestions();