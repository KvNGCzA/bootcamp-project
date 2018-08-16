const request= require('supertest');
const bodyParser = require('body-parser');

const app = require('./server').app;


describe('GET /api/v1/questions', () => {
  it('should return status 200', (done) => {
  request(app)
  .get('/api/v1/questions')
  .expect(200)
  .end(done);
  });
  it('should return json format', (done) => {
  request(app)
  .get('/api/v1/questions')
  .expect('Content-type', /json/)
  .end(done);
  });
});

describe('POST /api/v1/questions', () => {
  it('should return json', (done) => {
  const obj = {
    title: "test",
    content: "test"
  };
  request(app)
  .post('/api/v1/questions')
  .send(obj)
  .expect(201, {
    status: 201,
    result: "Question added"
  })
  .end(done);
  });
  it('should return 400 error when you send wrong or no information', (done) => {
  request(app)
  .post('/api/v1/questions')
  .send({yam: 'egg'})
  .expect(400, {
    status: 400,
    message: "Title can not be empty"
  })
  .end(done);
  });
  it('should return 400 error when you send just title', (done) => {
  request(app)
  .post('/api/v1/questions')
  .send({title: 'egg'})
  .expect(400, {
    status: 400,
    message: "Content can not be empty"
  })
  .end(done);
  });
});
