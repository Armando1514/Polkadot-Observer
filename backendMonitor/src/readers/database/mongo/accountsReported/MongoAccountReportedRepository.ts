import mongoose from 'mongoose';
import { MongoAccountReportedModel } from './MongoAccountReportedModel';
import keys from '../../../../keys';
import { AccountReportedRepository } from '../../AccountReportedRepository';

export class MongoAccountReportedRepository
  implements AccountReportedRepository
{
  constructor() {
    if (mongoose.connection.readyState !== 1) {
      const uri = keys.mongoURI || 'mongodb://localhost:27017/accounts';
      mongoose.connect(uri);
    }
  }
  async storeReportedAccount(address: string, number: number): Promise<void> {
    await MongoAccountReportedModel.create({
      address,
      number,
    });
  }
}
