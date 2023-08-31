import mongoose from 'mongoose';
import { ReportedAccountModel } from './ReportedAccountModel';
import keys from '../../../keys';
import { ReportedAccountsRepository } from '../ReportedAccountsRepository';
import { AccountReport } from '../../../domain/model/AccountReport';

export class MongoReportedAccountsRepository
  implements ReportedAccountsRepository
{
  constructor() {
    if (mongoose.connection.readyState !== 1) {
      const uri = keys.mongoURI || 'mongodb://localhost:27017/accounts';
      mongoose.connect(uri);
    }
  }
  async retrieveReportedAccounts(): Promise<AccountReport[] | null> {
    const docs = await ReportedAccountModel.find({});
    if (docs.length === 0) return null;
    const reportedAccounts = docs.map(
      (doc) => new AccountReport(doc.address, doc.blockNumber)
    );
    return reportedAccounts;
  }
}
