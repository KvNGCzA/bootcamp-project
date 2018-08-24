'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Questions = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _db = require('../db');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Questions = exports.Questions = function () {
    function Questions() {
        _classCallCheck(this, Questions);
    }

    _createClass(Questions, [{
        key: 'fetchQuestions',

        // fetch all questions
        value: function () {
            function fetchQuestions(req, res) {
                _db.db.any('SELECT * FROM questions').then(function (questions) {
                    return res.status(200).json({ questions: questions });
                })['catch'](function (error) {
                    return res.status(404).json({ error: error });
                });
            }

            return fetchQuestions;
        }()
    }, {
        key: 'postQuestion',
        value: function () {
            function postQuestion(req, res) {
                if (!req.body.userId) {
                    return res.status(400).json({
                        message: 'please enter user id!'
                    });
                }
                if (!req.body.question) {
                    return res.status(400).json({
                        message: 'please enter question!'
                    });
                }
                _db.db.any('INSERT INTO questions (question, userid) VALUES ($1, $2)', [req.body.question, req.body.userId]).then(function (result) {
                    return res.status(201).json({ status: 201, message: 'Question Posted' });
                })['catch'](function (error) {
                    return res.status(404).json({ error: error });
                });
            }

            return postQuestion;
        }()
    }]);

    return Questions;
}();