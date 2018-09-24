import * as supertest from 'supertest';
import app from '../server';

const request = supertest.agent(app);

describe('GET /', () => {
    it('should return homepage', (done) => {
        request
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200)
        .end(done);
    });
});

describe('GET /profile', () => {
    it('should return profile page', (done) => {
        request
        .get('/profile')
        .expect('Content-Type', /html/)
        .expect(200)
        .end(done);
    });
});

describe('GET /question', () => {
    it('should return question page', (done) => {
        request
        .get('/question')
        .expect('Content-Type', /html/)
        .expect(200)
        .end(done);
    });
});

describe('GET /post-question', () => {
    it('should return post-question page', (done) => {
        request
        .get('/post-question')
        .expect('Content-Type', /html/)
        .expect(200)
        .end(done);
    });
});

describe('GET /login-signup', () => {
    it('should return login-signup page', (done) => {
        request
        .get('/login-signup')
        .expect('Content-Type', /html/)
        .expect(200)
        .end(done);
    });
});

describe('GET /nopage', () => {
    it('should return error page', (done) => {
        request
        .get('/nopage')
        .expect('Content-Type', /html/)
        .expect(404)
        .end(done);
    });
});