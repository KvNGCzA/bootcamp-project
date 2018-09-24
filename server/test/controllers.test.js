import * as supertest from 'supertest';
import app from '../server';

const request = supertest.agent(app);

let token;
let token2;
let token3;

// sign up
describe('POST/ api/v2/auth/signup', () => {
	// create your user account
	it('should create a (your) first user account', (done) => {
		request
			.post('/api/v2/auth/signup')
			.send({
				firstName: 'TestChris',
				lastName: 'AkanmuTest',
				username: 'christest',
				email: 'testmail@yahoo.com',
				password: 'testpass',
				occupation: 'Programmer',
			})
			.expect(201)
			.expect('Content-Type', /json/)
			.end(done);
	});
	// create second user account
	it('should create a second user account', (done) => {
		request
			.post('/api/v2/auth/signup')
			.send({
				firstName: 'TestbabaDee',
				lastName: 'TestdeeBaba',
				username: 'babaDee',
				email: 'babadee@yahoo.com',
				password: 'testpass',
				occupation: 'Programmer',
			})
			.expect(201)
			.expect('Content-Type', /json/)
			.end(done);
	});
	it('should create a third user account', (done) => {
		request
			.post('/api/v2/auth/signup')
			.send({
				firstName: 'Testfred',
				lastName: 'TestFred',
				username: 'fred',
				email: 'fred@yahoo.com',
				password: 'testpass',
				occupation: 'Programmer',
			})
			.expect(201)
			.expect('Content-Type', /json/)
			.end(done);
	});
	it('should return 409 and user with this email already exists', (done) => {
		request
			.post('/api/v2/auth/signup')
			.send({
				firstName: 'TestChris',
				lastName: 'AkanmuTest',
				username: 'christestt',
				email: 'testmail@yahoo.com',
				password: 'testpass',
				occupation: 'Programmer',
			})
			.expect('Content-Type', /json/)
			.expect(409, { status: 409, message: 'a user with this email already exists' })
			.end(done);
	});
	it('should return 409 and user with this username already exists', (done) => {
		request
			.post('/api/v2/auth/signup')
			.send({
				firstName: 'TestChris',
				lastName: 'AkanmuTest',
				username: 'christest',
				email: 'testmail1@yahoo.com',
				password: 'testpass',
				occupation: 'Programmer',
			})
			.expect('Content-Type', /json/)
			.expect(409, { status: 409, message: 'a user with this username already exists' })
			.end(done);
	});
	it('should not create user if first name is an invalid format', (done) => {
		request
			.post('/api/v2/auth/signup')
			.send({
				firstName: '',
				lastName: 'AkanmuTest',
				username: 'christest',
				email: 'testmail@yahoo.com',
				password: 'testpass',
				occupation: 'Programmer',
			})
			.expect(400, { status: 400, message: 'first name is empty or an invalid format' })
			.end(done);
	});
	it('should not create user if last name is an invalid format', (done) => {
		request
			.post('/api/v2/auth/signup')
			.send({
				firstName: 'ckus',
				lastName: '',
				username: 'christest',
				email: 'testmail@yahoo.com',
				password: 'testpass',
				occupation: 'Programmer',
			})
			.expect(400, { status: 400, message: 'last name is empty or an invalid format' })
			.end(done);
	});
	it('should not create user if email is an invalid format', (done) => {
		request
			.post('/api/v2/auth/signup')
			.send({
				firstName: 'ckus',
				lastName: 'iudys',
				username: 'christest',
				email: 'testmail@yaho.co',
				password: 'testpass',
				occupation: 'Programmer',
			})
			.expect(400, { status: 400, message: 'email address is empty or an invalid format' })
			.end(done);
	});
	it('should not create user if password is an invalid format', (done) => {
		request
			.post('/api/v2/auth/signup')
			.send({
				firstName: 'ckus',
				lastName: 'iudys',
				username: 'christest',
				email: 'testmail@yahoo.com',
				password: '',
				occupation: 'Programmer',
			})
			.expect(400, { status: 400, message: 'password is empty or an invalid format' })
			.end(done);
	});
});

// login
describe('POST/ api/v2/auth/login', () => {
	before((done) => {
		request
			.post('/api/v2/auth/login')
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
			.post('/api/v2/auth/login')
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
			.post('/api/v2/auth/login')
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
			.post('/api/v2/auth/login')
			.send({
				email: 'testmail@yahoo.com',
				password: 'testpass',
			})
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done);
	});
	it('should not log user in', (done) => {
		request
			.post('/api/v2/auth/login')
			.send({
				email: 'testmail@yahoo.com',
				password: 'asdas',
			})
			.expect(401, { status: 401, message: 'email and password do not match' })
			.expect('Content-Type', /json/)
			.end(done);
	});
	it('should not log user in if email is invalid', (done) => {
		request
			.post('/api/v2/auth/login')
			.send({
				email: '..@yoo.com',
				password: 'asdas',
			})
			.expect(400, { status: 400, message: 'email address is empty or an invalid format' })
			.expect('Content-Type', /json/)
			.end(done);
	});
	it('should not log user in if password is empty', (done) => {
		request
			.post('/api/v2/auth/login')
			.send({
				email: 'testmail@yahoo.com',
				password: '',
			})
			.expect(400, { status: 400, message: 'please enter a valid password' })
			.expect('Content-Type', /json/)
			.end(done);
	});
	it('should not log user in if user doesnot exist in the database', (done) => {
		request
			.post('/api/v2/auth/login')
			.send({
				email: 'sadas@yahoo.com',
				password: 'asdasdad',
			})
			.expect(400, { status: 400, message: 'invalid user!' })
			.expect('Content-Type', /json/)
			.end(done);
	});
});

// get all users
describe('GET/ api/v2/auth/users', () => {
	it('should return a list of all users', (done) => {
		request
			.get('/api/v2/auth/users')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done);
	});
});

// fetch user by username
describe('GET/ api/v2/auth/user/:username', () => {
	it('should fetch a user by their username', (done) => {
		request
			.get('/api/v2/auth/user/christest')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done);
	});
	it('should fetch a user by their username', (done) => {
		request
			.get('/api/v2/auth/user/chriserertest')
			.expect(404, { status: 404, message: 'user not found!' })
			.expect('Content-Type', /json/)
			.end(done);
	});
});

// post a question
describe('POST/ api/v2/questions', () => {
	it('should post a question', (done) => {
		request
			.post('/api/v2/questions')
			.send({
				title: 'test',
				content: 'test2',
				tags: 'ruby, java',
				token,
			})
			.expect(201, { status: 201, message: 'question posted!' })
			.end(done);
	});
	it('should post a question', (done) => {
		request
			.post('/api/v2/questions')
			.send({
				title: 'test',
				content: 'test2',
				tags: 'ruby, java',
				token,
			})
			.expect(201, { status: 201, message: 'question posted!' })
			.end(done);
	});
	it('should fail to post without title property', (done) => {
		request
			.post('/api/v2/questions')
			.send({
				content: 'test2',
				tags: 'ruby, java',
				token,
			})
			.expect(400, { status: 400, message: 'please enter question title!' })
			.end(done);
	});
	it('should fail to post without content property', (done) => {
		request
			.post('/api/v2/questions')
			.send({
				title: 'test',
				tags: 'ruby, java',
				token,
			})
			.expect(400, { status: 400, message: 'please enter question content!' })
			.end(done);
	});
	it('should fail to post without tags property', (done) => {
		request
			.post('/api/v2/questions')
			.send({
				title: 'test',
				content: 'test2',
				token,
			})
			.expect(400, { status: 400, message: 'please enter tags for this question!' })
			.end(done);
	});
	it('should fail to post question if body and title are just integers', (done) => {
		request
			.post('/api/v2/questions')
			.send({
				title: '342354324',
				content: '354254353453',
				tags: 'chris, chris, chris',
				token,
			})
			.expect(400, { status: 400, message: 'you cannot post this type of title or content!' })
			.end(done);
	});
	it('should fail to post question if user is not logged in', (done) => {
		request
			.post('/api/v2/questions')
			.expect(401, { message: 'Please login to perform this action!' })
			.end(done);
	});
});

// post answer
describe('POST/ api/v2/questions/:questionId/answers', () => {
	it('should post an answer to your own question', (done) => {
		request
			.post('/api/v2/questions/1/answers')
			.send({ answer: 'test answer', token })
			.expect(201, { status: 201, message: 'answer posted!' })
			.end(done);
	});
	it('should post a second answer to the question', (done) => {
		request
			.post('/api/v2/questions/1/answers')
			.send({ answer: 'test answer', token: token2 })
			.expect(201, { status: 201, message: 'answer posted!' })
			.end(done);
	});
	it('should not post an answer if question does not exist', (done) => {
		request
			.post('/api/v2/questions/8/answers')
			.send({ answer: 'test answer', token })
			.expect(404, { status: 404, message: 'question does not exist' })
			.end(done);
	});
	it('should not post an answer if answer property is empty', (done) => {
		request
			.post('/api/v2/questions/1/answers')
			.send({ token })
			.expect(400, { status: 400, message: 'invalid or empty answer property!' })
			.end(done);
	});
	it('should not post an answer if questionId parameter is not valid', (done) => {
		request
			.post('/api/v2/questions/abc/answers')
			.send({
				answer: 'test answer',
				token: token2,
			})
			.expect(400, { status: 400, message: 'questionId must be an integer or less than nine characters!' })
			.end(done);
	});
});

describe('POST/ api/v2/questions/:questionId/answers', () => {
	it('should post an answer to your question from another account', (done) => {
		request
			.post('/api/v2/questions/1/answers')
			.send({
				answer: 'test answer from other user',
				token: token2,
			})
			.expect(201, {
				status: 201,
				message: 'answer posted!',
			})
			.end(done);
	});
	it('should not post an answer if answer property is empty', (done) => {
		request
			.post('/api/v2/questions/1/answers')
			.send({
				token: token2,
			})
			.expect(400, { status: 400, message: 'invalid or empty answer property!' })
			.end(done);
	});
	it('should not post an answer if questionId parameter is not valid', (done) => {
		request
			.post('/api/v2/questions/abc/answers')
			.send({
				answer: 'test answer',
				token: token2,
			})
			.expect(400, { status: 400, message: 'questionId must be an integer or less than nine characters!' })
			.end(done);
	});
});

// like an answer
describe('PUT/ api/v2/questions/answers/:answerId/like', () => {
	it('should like an answer', (done) => {
		request
			.put('/api/v2/questions/answers/1/like')
			.send({ token })
			.expect('Content-Type', /json/)
			.expect(200, { status: 200, message: 'answer liked!' })
			.end(done);
	});
	it('should like an answer by another user', (done) => {
		request
			.put('/api/v2/questions/answers/1/like')
			.send({ token: token2 })
			.expect('Content-Type', /json/)
			.expect(200, { status: 200, message: 'answer liked!' })
			.end(done);
	});
	it('should fail to like an answer that doesn\'t exist', (done) => {
		request
			.put('/api/v2/questions/answers/6/like')
			.send({ token: token2 })
			.expect('Content-Type', /json/)
			.expect(400, { status: 400, message: 'answer does not exist!' })
			.end(done);
	});
	it('should unlike an answer', (done) => {
		request
			.put('/api/v2/questions/answers/1/like')
			.send({ token })
			.expect('Content-Type', /json/)
			.expect(200, { status: 200, message: 'answer unliked!' })
			.end(done);
	});
	it('should fail to like an answer an answer', (done) => {
		request
			.put('/api/v2/questions/answers/sdga/like')
			.send({ token })
			.expect('Content-Type', /json/)
			.expect(400, { status: 400, message: 'answerId must be an integer or less than nine characters!' })
			.end(done);
	});
});

// dislike an answer
describe('PUT/ api/v2/questions/answers/:answerId/dislike', () => {
	it('should dislike an answer', (done) => {
		request
			.put('/api/v2/questions/answers/1/dislike')
			.send({ token })
			.expect('Content-Type', /json/)
			.expect(200, { status: 200, message: 'answer disliked!' })
			.end(done);
	});
	it('should dislike an answer by another user', (done) => {
		request
			.put('/api/v2/questions/answers/1/dislike')
			.send({ token: token2 })
			.expect('Content-Type', /json/)
			.expect(200, { status: 200, message: 'answer disliked!' })
			.end(done);
	});
	it('should fail to dislike an answer that doesn\'t exist', (done) => {
		request
			.put('/api/v2/questions/answers/6/dislike')
			.send({ token: token2 })
			.expect('Content-Type', /json/)
			.expect(400, { status: 400, message: 'answer does not exist!' })
			.end(done);
	});
	it('should undislike an answer', (done) => {
		request
			.put('/api/v2/questions/answers/1/dislike')
			.send({ token })
			.expect('Content-Type', /json/)
			.expect(200, { status: 200, message: 'answer undisliked!' })
			.end(done);
	});
	it('should fail to undislike an answer', (done) => {
		request
			.put('/api/v2/questions/answers/sdga/dislike')
			.send({ token })
			.expect('Content-Type', /json/)
			.expect(400, { status: 400, message: 'answerId must be an integer or less than nine characters!' })
			.end(done);
	});
});

// like an question
describe('PUT/ api/v2/questions/:questionId/like', () => {
	it('should dislike a question', (done) => {
		request
			.put('/api/v2/questions/2/dislike')
			.send({ token })
			.expect('Content-Type', /json/)
			.expect(200, { status: 200, message: 'question disliked!' })
			.end(done);
	});
	it('should like an question', (done) => {
		request
			.put('/api/v2/questions/1/like')
			.send({ token })
			.expect('Content-Type', /json/)
			.expect(200, { status: 200, message: 'question liked!' })
			.end(done);
	});
	it('should fail to like a question that doesn\'t exist', (done) => {
		request
			.put('/api/v2/questions/4/like')
			.send({ token: token2 })
			.expect('Content-Type', /json/)
			.expect(400, { status: 400, message: 'question does not exist!' })
			.end(done);
	});
	it('should like an question by another user', (done) => {
		request
			.put('/api/v2/questions/1/like')
			.send({ token: token2 })
			.expect('Content-Type', /json/)
			.expect(200, { status: 200, message: 'question liked!' })
			.end(done);
	});
	it('should unlike an question', (done) => {
		request
			.put('/api/v2/questions/1/like')
			.send({ token })
			.expect('Content-Type', /json/)
			.expect(200, { status: 200, message: 'question unliked!' })
			.end(done);
	});
	it('should fail to like an question an question', (done) => {
		request
			.put('/api/v2/questions/sdga/like')
			.send({ token })
			.expect('Content-Type', /json/)
			.expect(400, { status: 400, message: 'questionId must be an integer or less than nine characters!' })
			.end(done);
	});
});

// dislike a question
describe('PUT/ api/v2/questions/:questionId/dislike', () => {
	it('should like an question', (done) => {
		request
			.put('/api/v2/questions/2/like')
			.send({ token })
			.expect('Content-Type', /json/)
			.expect(200, { status: 200, message: 'question liked!' })
			.end(done);
	});
	it('should dislike a question', (done) => {
		request
			.put('/api/v2/questions/1/dislike')
			.send({ token })
			.expect('Content-Type', /json/)
			.expect(200, { status: 200, message: 'question disliked!' })
			.end(done);
	});
	it('should fail to dislike a question that doesn\'t exist', (done) => {
		request
			.put('/api/v2/questions/4/dislike')
			.send({ token: token2 })
			.expect('Content-Type', /json/)
			.expect(400, { status: 400, message: 'question does not exist!' })
			.end(done);
	});
	it('should dislike an question', (done) => {
		request
			.put('/api/v2/questions/1/dislike')
			.send({ token: token2 })
			.expect('Content-Type', /json/)
			.expect(200, { status: 200, message: 'question disliked!' })
			.end(done);
	});
	it('should undislike an question', (done) => {
		request
			.put('/api/v2/questions/1/dislike')
			.send({ token })
			.expect('Content-Type', /json/)
			.expect(200, { status: 200, message: 'question undisliked!' })
			.end(done);
	});
	it('should fail to undislike an question', (done) => {
		request
			.put('/api/v2/questions/sdga/dislike')
			.send({ token })
			.expect('Content-Type', /json/)
			.expect(400, { status: 400, message: 'questionId must be an integer or less than nine characters!' })
			.end(done);
	});
});

// favorite an answer
describe('PUT/ api/v2/questions/:questionId/answers/:answerId', () => {
	it('should favorite an answer', (done) => {
		request
			.put('/api/v2/questions/1/answers/1')
			.send({ token })
			.expect(200, { status: 200, message: 'answer was favorited!' })
			.end(done);
	});
	it('should favorite another answer', (done) => {
		request
			.put('/api/v2/questions/1/answers/2')
			.send({ token })
			.expect(200, { status: 200, message: 'answer was favorited!' })
			.end(done);
	});
	it('should unfavorite an answer', (done) => {
		request
			.put('/api/v2/questions/1/answers/2')
			.send({ token })
			.expect(200, { status: 200, message: 'answer was unfavorited!' })
			.end(done);
	});
	it('should not favorite an answer if questionId parameter is invalid', (done) => {
		request
			.put('/api/v2/questions/abc/answers/1')
			.send({ token })
			.expect(400, { status: 400, message: 'questionId must be an integer or less than nine characters!' })
			.end(done);
	});
	it('should not favorite an answer if answer parameter is invalid', (done) => {
		request
			.put('/api/v2/questions/1/answers/abc')
			.send({ token })
			.expect(400, { status: 400, message: 'answerId must be an integer or less than nine characters!' })
			.end(done);
	});
	it('should not favorite an answer if answer does not exist', (done) => {
		request
			.put('/api/v2/questions/1/answers/123')
			.send({ token })
			.expect(404, { status: 404, message: 'answer does not exist!' })
			.end(done);
	});
});

describe('PUT/ api/v2/questions/:questionId/answers/:answerId', () => {
	it('should edit an answer', (done) => {
		request
			.put('/api/v2/questions/1/answers/2')
			.send({ token: token2, newAnswer: 'edited answer' })
			.expect(201, { status: 201, message: 'answer updated!' })
			.end(done);
	});

	it('should return an error, this user does not have access to this endpoint', (done) => {
		request
			.put('/api/v2/questions/1/answers/2')
			.send({ token: token3, newAnswer: 'edited answer' })
			.expect(400, { status: 400, message: 'You do no have access to this' })
			.end(done);
	});
});

// get question by id
describe('GET/ api/v2/questions/:questionId', () => {
	it('should fetch a question and its answers by its id', (done) => {
		request
			.get('/api/v2/questions/1/')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done);
	});
	it('should fail to fetch if question does not exist', (done) => {
		request
			.get('/api/v2/questions/123/')
			.expect(404, { status: 404, message: 'question does not exist' })
			.expect('Content-Type', /json/)
			.end(done);
	});
	it('should fail to fetch if parameter is invalid', (done) => {
		request
			.get('/api/v2/questions/abc/')
			.expect(400, { status: 400, message: 'questionId must be an integer or less than nine characters!' })
			.expect('Content-Type', /json/)
			.end(done);
	});
});

// get a users questions by username
describe('GET/ /api/v2/questions/:username/questions', () => {
	it('should return a specific users questions', (done) => {
		request
			.get('/api/v2/questions/christest/questions')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done);
	});
	it('should not return a question if username is an invalid format', (done) => {
		request
			.get('/api/v2/questions/christ...est/questions')
			.expect(400, { status: 400, message: 'username is in an invalid format' })
			.expect('Content-Type', /json/)
			.end(done);
	});
	it('should not return questions if user does not exist', (done) => {
		request
			.get('/api/v2/questions/christt/questions')
			.expect(404, { status: 404, message: 'questions not found!' })
			.expect('Content-Type', /json/)
			.end(done);
	});
});

// fetch all questions
describe('GET/ api/v2/questions', () => {
	it('should return all questions in the database', (done) => {
		request
			.get('/api/v2/questions')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done);
	});
});

// delete a question
describe('DELETE/ api/v2/questions/:questionId', () => {
	it('it should not delete question if the request is not sent by the question creator', (done) => {
		request
			.delete('/api/v2/questions/1')
			.send({ token: token2 })
			.expect(400, { status: 400, message: 'You do not have the permission to delete this question!' })
			.end(done);
	});
	it('it should delete a question and all its answers if the request is sent by the question creator', (done) => {
		request
			.delete('/api/v2/questions/1')
			.send({ token })
			.expect(200, { status: 200, message: 'question deleted!' })
			.end(done);
	});
	it('it should not delete a questioon if question does not exist', (done) => {
		request
			.delete('/api/v2/questions/1')
			.send({ token })
			.expect(404, { status: 404, message: 'question does not exist' })
			.end(done);
	});
});

// logout a user
describe('POST/ api/v2/auth/logout', () => {
	it('should log a user out', (done) => {
		request
			.post('/api/v2/auth/logout')
			.send({ token })
			.expect(200, { status: 200, message: 'user logged out!' })
			.end(done);
	});
});
