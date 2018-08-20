import * as supertest from 'supertest';
import app from '../server/server';
import * as question from '../api/models/question';

const request = supertest.agent(app);


describe('GET /api/v1/questions', () => {
	it('should return status 200', (done) => {
		request
			.get('/api/v1/questions')
			.expect(200)
			.end(done);
	});
	it('should return all questions in JSON format', (done) => {
		request
			.get('/api/v1/questions')
			.expect('Content-type', /json/)
			.end(done);
	});
});

describe('POST /api/v1/questions', () => {
	it('should return 201 and success message in JSON format', (done) => {
		request
			.post('/api/v1/questions')
			.send({
				title: 'test',
				content: 'test',
			})
			.expect(201, {
				status: 201,
				result: 'Question added',
			})
			.expect('Content-type', /json/)
			.end(done);
	});
	it('should return 400 error when you send wrong or no information', (done) => {
		request
			.post('/api/v1/questions')
			.send({ yam: 'egg' })
			.expect('Content-type', /json/)
			.expect(400, {
				status: 400,
				message: 'Title can not be empty',
			})
			.end(done);
	});
	it('should return 400 error when you send just title', (done) => {
		request
			.post('/api/v1/questions')
			.send({ title: 'egg' })
			.expect('Content-type', /json/)
			.expect(400, {
				status: 400,
				message: 'Content can not be empty',
			})
			.end(done);
	});
});

const allQuestions = question.fetchQuestions();
const lastItem = allQuestions.length + 1;

describe('GET /api/v1/question/questionId', () => {
	it('should return 200 & JSON format', (done) => {
		request
			.get(`/api/v1/questions/question${lastItem}`)
			.expect(200, {
				question: {
					questionId: `question${lastItem}`,
					title: 'test',
					content: 'test',
					answer: [],
				},
			})
			.expect('Content-type', /json/)
			.end(done);
	});
	it('should return error for wrong ID', (done) => {
		request
			.get('/api/v1/questions/question')
			.expect(404, {
				message: 'Invalid question id'
			})
			.expect('Content-type', /json/)
			.end(done);
	});
});

describe('POST /api/v1/question/questionId/answers', () => {
	it('should return 201 and JSON format if answer is successfully posted', (done) => {
		request
			.post(`/api/v1/questions/question${lastItem}/answers`)
			.send({
				answer: 'test answer',
			})
			.expect(201, {
				status: 201,
				message: 'Answer added',
			})
			.expect('Content-type', /json/)
			.end(done);
	});
	it('should return 404 error if questionId is invalid', (done) => {
		request
			.post('/api/v1/questions/question/answers')
			.send({ answer: 'test answer' })
			.expect(404, {
				status: 404,
				message: 'Question id is invalid',
			})
			.end(done);
	});
	it('should return 404 error if answer not included', (done) => {
		request
			.post(`/api/v1/questions/question${lastItem}/answers`)
			.send()
			.expect(404, {
				status: 404,
				message: 'Missing answer property',
			})
			.expect('Content-type', /json/)
			.end(done);
	});
});

describe('PATCH /api/v1/question/questionId', () => {
	it('should return 201 and JSON format if title property is successfully edited', (done) => {
		request
			.patch(`/api/v1/questions/question${lastItem}`)
			.send({
				prop: 'title',
				newProp: 'New Test Title',
			})
			.expect('Content-type', /json/)
			.expect(201, {
				status: 201,
				message: 'Question title updated',
			})
			.end(done);
	});
	it('should return 201 and JSON format if content property is successfully edited', (done) => {
		request
			.patch(`/api/v1/questions/question${lastItem}`)
			.send({
				prop: 'content',
				newProp: 'New Test Content',
			})
			.expect('Content-type', /json/)
			.expect(201, {
				status: 201,
				message: 'Question content updated',
			})
			.end(done);
	});
	it('should return 404 error if question id is invalid', (done) => {
		request
			.patch('/api/v1/questions/question')
			.send({
				prop: 'content',
				newProp: 'New Test Content',
			})
			.expect('Content-type', /json/)
			.expect(404, { status: 404, message: 'Question id is invalid' })
			.end(done);
	});
	it('should return 404 error if property to change is not provided', (done) => {
		request
			.patch(`/api/v1/questions/question${lastItem}`)
			.send({
				newProp: 'New Test Content',
			})
			.expect('Content-type', /json/)
			.expect(404, { status: 404, message: 'Missing prop property' })
			.end(done);
	});
	it('should return 404 error if new property content is not provided', (done) => {
		request
			.patch(`/api/v1/questions/question${lastItem}`)
			.send({
				prop: 'content',
			})
			.expect('Content-type', /json/)
			.expect(404, { status: 404, message: 'Missing newProp property' })
			.end(done);
	});
});

describe('DELETE /api/v1/question/questionId', () => {
	it('should return 200 and success message in JSON format', (done) => {
		request
			.delete(`/api/v1/questions/question${lastItem}`)
			.expect(200, {
				status: 200,
				message: 'Question deleted',
			})
			.expect('Content-type', /json/)
			.end(done);
	});
	it('should return 404 error and message in JSON format if question Id is invalid', (done) => {
		request
			.delete('/api/v1/questions/question')
			.expect(404, {
				status: 404,
				message: 'Invalid question id',
			})
			.expect('Content-type', /json/)
			.end(done);
	});
});
