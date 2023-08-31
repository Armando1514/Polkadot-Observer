import { AccountReport } from '../../../../../src/model/AccountReport';
import { MongoAccountReportedModel } from '../../../../../src/reporters/database/accountsReported/MongoAccountReportedModel';
import { MongoAccountReportedRepository } from '../../../../../src/reporters/database/accountsReported/MongoAccountReportedRepository';

describe('Store reported accounts', () => {
  it('Should store the account in the system', async () => {
    const account1 = new AccountReport(
      '0x056a6a4e203766ffbea3146967ef25e9daf677b14dc6f6ed8919b1983c9bebbc',
      1292
    );
    MongoAccountReportedModel.findOne = jest.fn().mockResolvedValue(null);

    MongoAccountReportedModel.create = jest.fn().mockResolvedValue([account1]);

    const reporter = new MongoAccountReportedRepository();
    expect(reporter.report(account1)).resolves.toBeUndefined();
  });
});
