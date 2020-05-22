const server = require('./server');
const supertest = require('supertest');
const db = require('../data/dbConfig');

// afterEach(async () => {
//   await db('users').truncate();
// });

describe('server', () => {
  it('can run the test', () => {
    expect(true).toBeTruthy();
  });

  describe('GET /', () => {
    it('should return http status code 200', () => {
      return supertest(server)
        .get('/')
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe('GET /api/users', () => {
    it('should return 200 of users', () => {
      return supertest(server)
        .get('/api/users')
        .then(response => {
          expect(response.status).toBe(200);
        });
    });

    it('should return 404 for the users if failed', () => {
      return superterst(server)
        .get('/api/users')
        .then(response => {
          expect(response.status).toBe(404);
        });
    });
  });
});
