import mongoose from 'mongoose';
import { MongoAccountModel } from './MongoAccountModel';
import keys from '../../../../keys';
import { Account } from '../../../../model/Account';
import { EventEmitter } from 'events';
export class MongoAccountReader implements DataReader<Account> {
  // nested class, yeah I don't like either, I am trying to use all the varieties of stuff.
  filledArrayEmitter = class FilledArrayEmitter extends EventEmitter {};
  _data: Account[];
  _checkEvents: EventEmitter;
  constructor() {
    if (mongoose.connection.readyState !== 1) {
      const uri = keys.mongoURI || 'mongodb://localhost:27017/accounts';
      try {
        mongoose.connect(uri);
      } catch (error) {
        console.log(
          `Problem with MongoConnection the pooling mechanism is not working, error: ${error}`
        );
      }
    }
    this._checkEvents = new this.filledArrayEmitter();
  }
  async read(): Promise<Account[] | null> {
    // I could have implemented the logic of polling to check for changes in the db differently
    // for instance saving the last id checked for optimization (the app is managing duplicates)
    // or with changestream (but you need a replica set mongodb, and takes much longer to implement on the infrastructure side)
    const time = parseInt(keys.poolingFrequency) || 3000;
    setInterval(async () => {
      try {
        const docs = await MongoAccountModel.find({});
        if (docs.length === 0) return null;
        const accounts = docs.map(
          (doc) => new Account(doc.address, doc.threshold)
        );
        // works only because I do only inserts
        if (!this._data || this._data.length != accounts.length) {
          this._data = accounts;
          this._checkEvents.emit('mapFilled');
        }
      } catch (error) {
        console.log('The system is not pooling from mongo, because: ', error);
      }
    }, time);
    return null;
  }
  get checkEvents() {
    return this._checkEvents;
  }
  get data() {
    return this._data;
  }
}
