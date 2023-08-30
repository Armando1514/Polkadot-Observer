import mongoose from 'mongoose';
interface IAccountReportedSchema extends mongoose.Document {
  address: string;
  blockNumber: number;
}

const AccountReportedSchema = new mongoose.Schema({
  address: String,
  blockNumber: Number,
});

export const MongoAccountReportedModel = mongoose.model<IAccountReportedSchema>(
  'ReportedAccounts',
  AccountReportedSchema
);
