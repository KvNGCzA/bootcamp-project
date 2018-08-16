const request= require('supertest');
const bodyParser = require('body-parser');

const app = require('./server').app;
const question = require('../api/models/question');

describe('GET /api/v1/questions', () => {
  it('should return status 200', (done) => {
  request(app)
  .get('/api/v1/questions')
  .expect(200)
  .end(done);
  });
  it('should return JSON format', (done) => {
  request(app)
  .get('/api/v1/questions')
  .expect('Content-type', /json/)
  .end(done);
  });
});

describe('POST /api/v1/questions', () => {
  it('should return JSON format', (done) => {
  request(app)
  .post('/api/v1/questions')
  .send({
    title: 'test',
    content: 'test'
  })
  .expect(201, {
    status: 201,
    result: 'Question added'
  })
  .end(done);
  });
  it('should return 400 error when you send wrong or no information', (done) => {
  request(app)
  .post('/api/v1/questions')
  .send({yam: 'egg'})
  .expect(400, {
    status: 400,
    message: 'Title can not be empty'
  })
  .end(done);
  });
  it('should return 400 error when you send just title', (done) => {
  request(app)
  .post('/api/v1/questions')
  .send({title: 'egg'})
  .expect(400, {
    status: 400,
    message: 'Content can not be empty'
  })
  .end(done);
  });
});

const allQuestions = question.fetchQuestions();
const lastItem = allQuestions.length + 1;

describe('GET /api/v1/question/questionId', () => {
  it('should return 200 & JSON format', (done) => {
    request(app)
    .get(`/api/v1/questions/question${lastItem}`)
    .expect(200, [{
      questionId: `question${lastItem}`,
      title: 'test',
      content: 'test',
      answer: []
    }])
    .expect('Content-type', /json/)
    .end(done);
  });
  it('should return error for wrong ID', (done) => {
    request(app)
    .get('/api/v1/questions/question')
    .expect(404, {
    status: 404,
    message: 'Invalid question id'
  })
    .end(done);
  });
});

describe('POST /api/v1/question/questionId/answers', () => {
    it('should return 201 and JSON format if answer is successfully posted', (done) => {
      request(app)
      .post(`/api/v1/questions/question${lastItem}/answers`)
      .send({
        answer: 'test answer'
      })
      .expect(201, { status: 201,
        message: 'Answer added' })
        .end(done);
    })
    it('should return error if questionId is invalid', (done) => {
      request(app)
      .post(`/api/v1/questions/question/answers`)
      .send({ answer: 'test answer'})
      .expect(404, { status: 404,
        message: 'Question id is invalid'
      })
      .end(done);
    });
    it('should return error if answer not included', (done) => {
      request(app)
      .post(`/api/v1/questions/question${lastItem}/answers`)
      .send()
      .expect(404, {  status: 404,
        message: 'Missing answer property'
       })
      .end(done);
    });
});
