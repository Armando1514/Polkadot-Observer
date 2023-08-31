import mongoose from 'mongoose';
interface IAccountReportedSchema extends mongoose.Document {
  address: string;
  blockNumber: number;
}

const AccountReportedSchema = new mongoose.Schema({
  address: String,
  blockNumber: Number,
});

export const ReportedAccountModel = mongoose.model<IAccountReportedSchema>(
  'Reported_Accounts',
  AccountReportedSchema
);
