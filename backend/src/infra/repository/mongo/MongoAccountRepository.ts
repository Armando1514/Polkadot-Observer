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
    // Assuming Account is a class constructor

    console.log(docs);
    const accounts = docs.map((doc) => new Account(doc.address, doc.threshold));
    return accounts;
  }
  async storeAccount(address: string, threshold: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
