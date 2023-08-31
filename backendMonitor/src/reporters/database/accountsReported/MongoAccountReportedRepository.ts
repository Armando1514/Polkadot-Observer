import mongoose from 'mongoose';
import { MongoAccountReportedModel } from './MongoAccountReportedModel';
import keys from '../../../keys';
import { AccountReport } from '../../../model/AccountReport';
import { Reporter } from '../../Reporter';
export class MongoAccountReportedRepository implements Reporter<AccountReport> {
  constructor() {
    if (mongoose.connection.readyState !== 1) {
      const uri = keys.mongoURI || 'mongodb://localhost:27017/accounts';
      try {
        mongoose.connect(uri);
      } catch (error) {
        console.log(
          `Problem with MongoConnection the report mechanism is not working, error: ${error}`
        );
      }
    }
  }
  async report({ address, blockNumber }: AccountReport): Promise<void> {
    try {
      const doc = await MongoAccountReportedModel.findOne({
        address,
        blockNumber,
      });

      if (doc == null) {
        await MongoAccountReportedModel.create({
          address,
          blockNumber,
        });
      }
    } catch (error) {
      console.log(
        `There was an error to report ${address} and ${blockNumber}, the error is: ${error}`
      );
    }
  }
}
