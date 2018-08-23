'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.User = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _db = require('../db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = exports.User = function () {
	function User() {
		_classCallCheck(this, User);
	}

	_createClass(User, [{
		key: 'createUser',
		value: function () {
			function createUser(req, res) {
				_db.db.any('SELECT * FROM users WHERE email = $1', [req.body.email]).then(function (user) {
					if (user.length === 0) {
						var email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email);
						var password = /[a-zA-Z]/.test(req.body.password) && /[\W\d]/.test(req.body.password) && req.body.password.length >= 6;
						if (email && password) {
							var hash = _bcrypt2['default'].hashSync(req.body.password, 10);
							return _db.db.any('INSERT INTO users (email, password) VALUES ($1, $2)', [req.body.email, hash]).then(function () {
								return res.status(201).json({ message: 'user created' });
							})['catch'](function (error) {
								return res.status(400).json({ error: error });
							});
						}
						if (!email) {
							return res.status(400).json({ message: 'email is an invalid format' });
						}
						if (!password) {
							return res.status(400).json({ message: 'password is an invalid format' });
						}
					}
					return res.status(409).json({ message: 'User mail exists' });
				})['catch'](function (error) {
					res.status(400).json(error);
				});
			}

			return createUser;
		}()
	}, {
		key: 'fetchUsers',
		value: function () {
			function fetchUsers(req, res) {
				_db.db.any('SELECT * FROM users').then(function (users) {
					return res.status(200).json({ users: users });
				})['catch'](function (error) {
					return res.status(400).json({ error: error });
				});
			}

			return fetchUsers;
		}()
	}]);

	return User;
}();