const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('POST /users', async () => {
  it('/ should insert new document to db and return success', async () => {
    const res = await request(server)
      .post('/users')
      .send({ username: '#Ania #3', password: 'alamakota', email: 'a@a.pl' });
    expect(res.status).to.be.equal(200);
  });
  it('/ should find user in db and return id', async () => {
    const res = await request(server)
      .post('/users/login')
      .send({ username: '#Ania #3', password: 'alamakota' });
    expect(res.status).to.be.equal(200);
  });
  it('/ should not find user in db and return message', async () => {
    const res = await request(server)
      .post('/users/login')
      .send({ username: '#Ania #3ncaicnaic', password: 'alamakotancani' });
    expect(res.status).to.be.equal(500);
  });  
});
