const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig');

beforeEach(() => {
  return db.migrate.rollback().then(() => db.migrate.latest());
});

test('POST /api/auth/register to be successful', async () => {
  const response = await request(server)
    .post('/api/auth/register')
    .send({username: 'sunil', password: 'sunil'});

  expect(response.status).toBe(200);
  expect(response.body).toMatchObject({username: 'sunil'});
});

test('DELETE /api/users/:id', async () => {
  const response = await request(server).delete('/api/auth/delete/2');
  expect(response.status).toBe(200);
});
