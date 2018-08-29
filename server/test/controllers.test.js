import * as supertest from 'supertest';
import app from '../server';
import { Questions } from '../controllers/sqlquestion';
const request = supertest.agent(app);

let token;
let token2;
let token3;

describe('POST/ test create new user endpoint', () => {
	// create your user account
	it('should create a (your) first user account', (done) => {
		request
			.post('/api/auth/signup')
			.send({
				firstName: 'TestChris',
				lastName: 'AkanmuTest',
				username: 'christest',
				email: 'testmail@yahoo.com',
				password: 'testpass',
			})
			.expect(201)
			.expect('Content-Type', /json/)
			.end(done);
	});
	// create second user account
	it('should create a second user account', (done) => {
		request
			.post('/api/auth/signup')
			.send({
				firstName: 'TestbabaDee',
				lastName: 'TestdeeBaba',
				username: 'babaDee',
				email: 'babadee@yahoo.com',
				password: 'testpass',
			})
			.expect(201)
			.expect('Content-Type', /json/)
			.end(done);
    });
    it('should create a third user account', (done) => {
		request
			.post('/api/auth/signup')
			.send({
				firstName: 'Testfred',
				lastName: 'TestFred',
				username: 'fred',
				email: 'fred@yahoo.com',
				password: 'testpass',
			})
			.expect(201)
			.expect('Content-Type', /json/)
			.end(done);
	});
	it('should return 409 and user with this email already exists', (done) => {
		request
			.post('/api/auth/signup')
			.send({
				firstName: 'TestChris',
				lastName: 'AkanmuTest',
				username: 'christest1',
				email: 'testmail@yahoo.com',
				password: 'testpass',
			})
			.expect('Content-Type', /json/)
			.expect(409, { message: 'a user with this email already exists' })
			.end(done);
	});
	it('should return 409 and user with this username already exists', (done) => {
		request
			.post('/api/auth/signup')
			.send({
				firstName: 'TestChris',
				lastName: 'AkanmuTest',
				username: 'christest',
				email: 'testmail1@yahoo.com',
				password: 'testpass',
			})
			.expect('Content-Type', /json/)
			.expect(409, { message: 'a user with this username already exists' })
			.end(done);
	});
});


describe('POST/ test login', () => {
	before((done) => {
		request
			.post('/api/auth/login')
			.send({
				email: 'testmail@yahoo.com',
				password: 'testpass',
			})
			.end((err, res) => {
				if (err) {
					return err;
				}
				token = res.headers['x-access-token'];
				done();
			});
	});
	before((done) => {
		request
			.post('/api/auth/login')
			.send({
				email: 'babadee@yahoo.com',
				password: 'testpass',
			})
			.end((err, res) => {
				if (err) {
					return err;
				}
				token2 = res.headers['x-access-token'];
				done();
			});
    });
    before((done) => {
		request
			.post('/api/auth/login')
			.send({
				email: 'fred@yahoo.com',
				password: 'testpass',
			})
			.end((err, res) => {
				if (err) {
					return err;
				}
				token3 = res.headers['x-access-token'];
				done();
			});
	});
	// login
	it('should return user logged in', (done) => {
		request
			.post('/api/auth/login')
			.send({
				email: 'testmail@yahoo.com',
				password: 'testpass',
			})
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done);
	});
});

// post a question
describe('POST/ post a question', () => {
	it('should post a question', (done) => {
		request
			.post('/api/questions')
			.send({
				title: 'test',
				content: 'test2',
				token,
			})
			.expect(201, { message: 'question posted!' })
			.end(done);
	});
});

// post answer
describe('POST/ an answer to your question', () => {
	it('should post an answer to your own question', (done) => {
		request
			.post('/api/questions/1/answers')
			.send({
				answer: 'test answer',
				token,
			})
			.expect(201, {
				message: 'answer posted!',
			})
			.end(done);
	});
});

describe('POST/ an answer to your question from second account', () => {
	it('should post an answer to your question from another account', (done) => {
		request
			.post('/api/questions/1/answers')
			.send({
				answer: 'test answer from other user',
				token: token2,
			})
			.expect(201, {
				message: 'answer posted!',
			})
			.end(done);
	});
});

describe('PUT/ favorite an answer', () => {
	it('should favorite an answer', (done) => {
		request
			.put('/api/questions/1/answers/1')
			.send({ token })
			.expect(200, { message: 'answer was favorited!' })
			.end(done);
	});
});

describe('PUT/ edit an answer', () => {
	it('should edit an answer', (done) => {
		request
			.put('/api/questions/1/answers/2')
			.send({ token: token2, newAnswer: 'edited answer' })
			.expect(201, { message: 'answer updated!' })
			.end(done);
	});

	it('should return an error, this user does not have access to this endpoint', (done) => {
		request
			.put('/api/questions/1/answers/2')
			.send({ token: token3, newAnswer: 'edited answer' })
			.expect(400, { message: 'You do no have access to this' })
			.end(done);
	});
});


describe('GET/ get a question by its id', () => {
    it('should fetch a question and its answers by its id',done => {
        request
            .get('/api/questions/1/')
            .expect(200)
            .end(done);
    });
});

describe('DELETE/ delete a question', () => {
    it('it should not delete question if the request is not sent by the question creator', done => {
        request
        .delete('/api/questions/1')
        .send({token: token2})
        .expect(400, { message: 'You do not have the permission to delete this question!' })
        .end(done);
    });
    it('it should delete a question and all its answers if the request is sent by the question creator', done => {
        request
        .delete('/api/questions/1')
        .send({ token })
        .expect(200, { message: 'question deleted!' })
        .end(done);
    });    
});
