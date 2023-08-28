import supertest from 'supertest';
import server from '../../src/server';
import { AccountModel } from '../../src/infra/repository/mongo/AccountModel';

const request = supertest(server);
describe('Get accounts', () => {
  it('Should retrieve the accounts from the system', async () => {
    const accountsList = [
      {
        address:
          '0x056a6a4e203766ffbea3146967ef25e9daf677b14dc6f6ed8919b1983c9bebbc',
        threshold: 4.4,
      },
    ];
    AccountModel.find = jest.fn().mockResolvedValue(accountsList);
    const response = await request.get('/api/v1/accounts');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(accountsList);
  });
});
