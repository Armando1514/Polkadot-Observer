import supertest from 'supertest';
import server from '../../src/server';
import { AccountModel } from '../../src/infra/repository/mongo/AccountModel';
import { Account } from '../../src/domain/model/Account';

const request = supertest(server);

describe('Store accounts', () => {
  it('Should store the account in the system', async () => {
    const account1 = new Account(
      '0x056a6a4e203766ffbea3146967ef25e9daf677b14dc6f6ed8919b1983c9bebbc',
      4.4
    );

    AccountModel.create = jest.fn().mockResolvedValue(null);
    AccountModel.findOne = jest.fn().mockResolvedValue(null);

    const response = await request.post('/api/v1/accounts').send({
      address: account1.address,
      threshold: account1.threshold,
    });
    expect(response.status).toBe(201);
  });
});
