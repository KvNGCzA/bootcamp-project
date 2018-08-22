'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var user = {
    email: 'yes@matchMedia.com'
};
var validateUser = exports.validateUser = function validateUser(req, res) {
    var email = typeof user.email === 'string';
    if (email) {
        return res.status(200).json(user.email);
    }
};