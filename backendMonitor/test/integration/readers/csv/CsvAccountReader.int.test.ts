import { Account } from '../../../../src/model/Account';
import { CsvAccountReader } from '../../../../src/readers/csv/CsvAccountReader';
import fs from 'fs';

jest.mock('fs');
describe('Account Reader Integration Tests', () => {
  const account1 = new Account(
    '0xce73267ed8316b4350672f32ba49af86a7ae7af1267beb868a27f3fda03c044a',
    2
  );
  const account2 = new Account(
    '0x903182d757c49195dbb6873788be00ac8f444145993458a7102a6edca2826b75',
    3
  );

  it('should read correctly from the csv file', async () => {
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementation(
        () =>
          `${account1.address},${account1.threshold}\n${account2.address},${account2.threshold}`
      );

    const csv = new CsvAccountReader('test.csv');
    csv.read();
    expect(csv.data).toStrictEqual([account1, account2]);
  });
});
