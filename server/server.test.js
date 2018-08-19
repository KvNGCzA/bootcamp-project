'use strict';

var _supertest = require('supertest');

var supertest = _interopRequireWildcard(_supertest);

var _server = require('../server/server');

var _server2 = _interopRequireDefault(_server);

var _question = require('../api/models/question');

var question = _interopRequireWildcard(_question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var request = supertest.agent(_server2['default']);

describe('GET /api/v1/questions', function () {
  it('should return status 200', function (done) {
    request.get('/api/v1/questions').expect(200).end(done);
  });
  it('should return all questions in JSON format', function (done) {
    request.get('/api/v1/questions').expect('Content-type', /json/).end(done);
  });
});

describe('POST /api/v1/questions', function () {
  it('should return 201 and success message in JSON format', function (done) {
    request.post('/api/v1/questions').send({
      title: 'test',
      content: 'test'
    }).expect(201, {
      status: 201,
      result: 'Question added'
    }).expect('Content-type', /json/).end(done);
  });
  it('should return 400 error when you send wrong or no information', function (done) {
    request.post('/api/v1/questions').send({ yam: 'egg' }).expect('Content-type', /json/).expect(400, {
      status: 400,
      message: 'Title can not be empty'
    }).end(done);
  });
  it('should return 400 error when you send just title', function (done) {
    request.post('/api/v1/questions').send({ title: 'egg' }).expect('Content-type', /json/).expect(400, {
      status: 400,
      message: 'Content can not be empty'
    }).end(done);
  });
});

var allQuestions = question.fetchQuestions();
var lastItem = allQuestions.length + 1;

describe('GET /api/v1/question/questionId', function () {
  it('should return 200 & JSON format', function (done) {
    request.get('/api/v1/questions/question' + String(lastItem)).expect(200, [{
      questionId: 'question' + String(lastItem),
      title: 'test',
      content: 'test',
      answer: []
    }]).expect('Content-type', /json/).end(done);
  });
  it('should return error for wrong ID', function (done) {
    request.get('/api/v1/questions/question').expect(404, {
      status: 404,
      message: 'Invalid question id'
    }).expect('Content-type', /json/).end(done);
  });
});

describe('POST /api/v1/question/questionId/answers', function () {
  it('should return 201 and JSON format if answer is successfully posted', function (done) {
    request.post('/api/v1/questions/question' + String(lastItem) + '/answers').send({
      answer: 'test answer'
    }).expect(201, {
      status: 201,
      message: 'Answer added'
    }).expect('Content-type', /json/).end(done);
  });
  it('should return 404 error if questionId is invalid', function (done) {
    request.post('/api/v1/questions/question/answers').send({ answer: 'test answer' }).expect(404, {
      status: 404,
      message: 'Question id is invalid'
    }).end(done);
  });
  it('should return 404 error if answer not included', function (done) {
    request.post('/api/v1/questions/question' + String(lastItem) + '/answers').send().expect(404, {
      status: 404,
      message: 'Missing answer property'
    }).expect('Content-type', /json/).end(done);
  });
});

describe('PATCH /api/v1/question/questionId', function () {
  it('should return 201 and JSON format if title property is successfully edited', function (done) {
    request.patch('/api/v1/questions/question' + String(lastItem)).send({
      prop: 'title',
      newProp: 'New Test Title'
    }).expect('Content-type', /json/).expect(201, {
      status: 201,
      message: 'Question title updated'
    }).end(done);
  });
  it('should return 201 and JSON format if content property is successfully edited', function (done) {
    request.patch('/api/v1/questions/question' + String(lastItem)).send({
      prop: 'content',
      newProp: 'New Test Content'
    }).expect('Content-type', /json/).expect(201, {
      status: 201,
      message: 'Question content updated'
    }).end(done);
  });
  it('should return 404 error if question id is invalid', function (done) {
    request.patch('/api/v1/questions/question').send({
      prop: 'content',
      newProp: 'New Test Content'
    }).expect('Content-type', /json/).expect(404, { status: 404, message: 'Question id is invalid' }).end(done);
  });
  it('should return 404 error if property to change is not provided', function (done) {
    request.patch('/api/v1/questions/question' + String(lastItem)).send({
      newProp: 'New Test Content'
    }).expect('Content-type', /json/).expect(404, { status: 404, message: 'Missing prop property' }).end(done);
  });
  it('should return 404 error if new property content is not provided', function (done) {
    request.patch('/api/v1/questions/question' + String(lastItem)).send({
      prop: 'content'
    }).expect('Content-type', /json/).expect(404, { status: 404, message: 'Missing newProp property' }).end(done);
  });
});

describe('DELETE /api/v1/question/questionId', function () {
  it('should return 200 and success message in JSON format', function (done) {
    request['delete']('/api/v1/questions/question' + String(lastItem)).expect(200, {
      status: 200,
      message: 'Question deleted'
    }).expect('Content-type', /json/).end(done);
  });
  it('should return 404 error and message in JSON format if question Id is invalid', function (done) {
    request['delete']('/api/v1/questions/question').expect(404, {
      status: 404,
      message: 'Invalid question id'
    }).expect('Content-type', /json/).end(done);
  });
});