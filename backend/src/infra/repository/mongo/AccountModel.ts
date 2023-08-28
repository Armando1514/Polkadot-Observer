import mongoose from 'mongoose';

interface IAccountSchema extends mongoose.Document {
  address: string;
  threshold: number;
}

const AccountSchema = new mongoose.Schema({
  address: String,
  threshold: Number,
});

export const AccountModel = mongoose.model<IAccountSchema>(
  'Accounts',
  AccountSchema
);
