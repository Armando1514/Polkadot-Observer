import supertest from 'supertest';
import server from '../../src/server';
import { AccountModel } from '../../src/infra/repository/mongo/AccountModel';
import { Account } from '../../src/domain/model/Account';

const request = supertest(server);
describe('Get accounts', () => {
  it('Should retrieve the accounts from the system', async () => {
    const account1 = new Account(
      '0x903182d757c49195dbb6873788be00ac8f444145993458a7102a6edca2826b75',
      4.4
    );

    const accountsList = [account1];
    AccountModel.find = jest.fn().mockResolvedValue(accountsList);
    const response = await request.get('/api/v1/accounts');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(accountsList);
  });
});
