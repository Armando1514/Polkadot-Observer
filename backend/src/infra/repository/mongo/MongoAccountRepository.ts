import mongoose from 'mongoose';
import { Account } from '../../../domain/model/Account';
import { AccountRepository } from '../AccountRepository';
import { AccountModel } from './AccountModel';

export class MongoAccountRepository implements AccountRepository {
  constructor() {
    if (mongoose.connection.readyState !== 1) {
      mongoose.connect('mongodb://localhost:27017/accounts');
    }
  }
  async retrieveAccounts(): Promise<Account[] | null> {
    const docs = await AccountModel.find({});
    if (docs.length === 0) return null;
    const accounts = docs.map((doc) => new Account(doc.address, doc.threshold));
    return accounts;
  }
  async storeAccount(account: Account): Promise<void> {
    const doc = await AccountModel.findOne({ address: account.address });
    if (doc == null) {
      await AccountModel.create({
        address: account.address,
        threshold: account.threshold,
      });
    }
  }
}
