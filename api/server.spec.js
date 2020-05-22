const server = require('./server');
const supertest = require('supertest');

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
});
