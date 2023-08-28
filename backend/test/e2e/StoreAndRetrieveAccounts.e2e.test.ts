import { AccountModel } from '../../src/infra/repository/mongo/AccountModel';
import { Account } from '../../src/domain/model/Account';
import supertest from 'supertest';
import server from '../../src/server';
const request = supertest(server);
describe('Store and Retrieve Accounts end to end tests', () => {
  beforeEach(async () => {
    await AccountModel.deleteMany({});
  });

  it('Should store an account in the database', async () => {
    const account1 = new Account(
      '0x056a6a4e203766ffbea3146967ef25e9daf677b14dc6f6ed8919b1983c9bebbc',
      4.4
    );
    const response = await request.post('/api/v1/accounts').send({
      address: account1.address,
      threshold: account1.threshold,
    });
    expect(response.status).toBe(201);
  });

  it('Should retrieve accounts in the database', async () => {
    const account1 = new Account(
      '0x056a6a4e203766ffbea3146967ef25e9daf677b14dc6f6ed8919b1983c9bebbc',
      4.4
    );
    await request.post('/api/v1/accounts').send({
      address: account1.address,
      threshold: account1.threshold,
    });

    const accountsList = [account1];

    const response = await request.get('/api/v1/accounts');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(accountsList);
  });
});
