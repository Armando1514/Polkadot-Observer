import { Account } from '../../model/Account';
import { CsvFileReader } from './CsvFileReader';

export class CsvAccountReader extends CsvFileReader<Account> {
  mapRow(row: string[]): Account {
    return new Account(row[0], parseFloat(row[1]));
  }
}
