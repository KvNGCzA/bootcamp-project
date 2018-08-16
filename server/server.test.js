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

// describe('POST /api/v1/questions', () => {
//   it('should return json', (done) => {
//   const obj = {
//     title: "test",
//     content: "test"
//   };
//   request(app)
//   .post('/api/v1/questions')
//   .send(obj)
//   .expect(201, {
//     status: 201,
//     result: "Question added"
//   })
//   .end(done);
//   });
//   it('should return 400 error when you send wrong information', (done) => {
//   request(app)
//   .post('/api/v1/questions')
//   .send({girls: 'ok', yam: 'egg'})
//   .expect(400)
//   .end(done);
//   });
// });
