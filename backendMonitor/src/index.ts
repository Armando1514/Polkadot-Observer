import { AccountAnalyzer } from './analyzer/accounts/AccountAnalyzer';
import { CsvAccountReader } from './readers/csv/CsvAccountReader';
import { MongoAccountReader } from './readers/database/mongo/accounts/MongoAccountReader';

const readerCsv = new CsvAccountReader('addresses.csv');
readerCsv.read();
const analyzer = AccountAnalyzer.getInstance();

analyzer.run(readerCsv.data);

const readerDb = new MongoAccountReader();
readerDb.read();

readerDb.checkEvents.on('arrayFilled', () => {
  analyzer.run(readerDb.data);
});
