const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('/GET tasks', async() => {

  it('it should Get all users with user_id 124', async () => {
    const res = await request(server)
      .get('/tasks/125');
    expect(res.status).to.be.equal(200);
  });
});
