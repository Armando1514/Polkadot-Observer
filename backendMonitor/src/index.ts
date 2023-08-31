import { AccountAnalyzer } from './analyzer/accounts/AccountAnalyzer';
import { AccountChainGuard } from './guards/chain/AccountChainGuard';
import { CsvAccountReader } from './readers/csv/CsvAccountReader';
import { MongoAccountReader } from './readers/database/mongo/accounts/MongoAccountReader';
import { MongoAccountReportedRepository } from './reporters/database/accountsReported/MongoAccountReportedRepository';

const readerCsv = new CsvAccountReader('addresses.csv');
readerCsv.read();
const analyzer = AccountAnalyzer.getInstance();

const csvAddresses = analyzer.run(readerCsv.data);

new AccountChainGuard().monitor(csvAddresses, [
  new MongoAccountReportedRepository(),
]);

const readerDb = new MongoAccountReader();
readerDb.read();

readerDb.checkEvents.on('mapFilled', () => {
  const dbAddresses = analyzer.run(readerDb.data);
  new AccountChainGuard().monitor(dbAddresses, [
    new MongoAccountReportedRepository(),
  ]);
});
