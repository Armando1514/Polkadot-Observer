import supertest from 'supertest';
import server from '../../src/server';
import { ReportedAccountModel } from '../../src/infra/repository/mongo/ReportedAccountModel';
import { AccountReport } from '../../src/domain/model/AccountReport';

const request = supertest(server);
describe('Get Reported accounts', () => {
  it('Should retrieve the accounts from the system', async () => {
    const account1 = new AccountReport(
      '0x903182d757c49195dbb6873788be00ac8f444145993458a7102a6edca2826b75',
      1232
    );

    const accountsList = [account1];
    ReportedAccountModel.find = jest.fn().mockResolvedValue(accountsList);
    const response = await request.get('/api/v1/accounts/reported');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(accountsList);
  });
});
