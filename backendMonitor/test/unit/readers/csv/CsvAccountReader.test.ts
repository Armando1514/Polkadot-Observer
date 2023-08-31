import { CsvAccountReader } from '../../../../src/readers/csv/CsvAccountReader';

describe('Account Reader Test', () => {
  it('should throw an error when the file is not present', () => {
    const csv = new CsvAccountReader('sfsadsadssddssdjdajsdjds.csv');
    try {
      csv.read();
    } catch (error) {
      expect(error.message).toContain('ENOENT: no such file or directory');
    }
  });
});
