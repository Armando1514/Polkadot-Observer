import { CsvAccountReader } from './readers/csv/CsvAccountReader';

const reader = new CsvAccountReader('addresses.csv');
reader.read();

console.log(reader.data);
