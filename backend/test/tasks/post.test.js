const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('POST /tasks', async () => {
  it('/ should insert new document to db and return success', async () => {
    const res = await request(server)
      .post('/tasks')
      .send({ task: '#Lorem #3', userId: '123' });
    expect(res.status).to.be.equal(200);
  });
});
