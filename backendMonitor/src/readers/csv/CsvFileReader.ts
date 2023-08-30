import fs from 'fs';
export abstract class CsvFileReader<T> implements DataReader<T> {
  _data: T[] = [];

  constructor(private _filename: string) {}
  abstract mapRow(row: string[]): T;

  read(): void {
    try {
      this._data = fs
        .readFileSync(this.filename, {
          encoding: 'utf-8',
        })
        ?.split('\n')
        ?.map((row: string): string[] => {
          return row.split(',');
        })
        ?.map(this.mapRow);
    } catch (error) {
      throw new Error(`Error reading CSV file: ${error.message}`);
    }
  }

  get data() {
    return this._data;
  }
  get filename() {
    return this._filename;
  }
}
