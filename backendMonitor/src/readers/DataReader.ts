interface DataReader<T> {
  read(): void;
  _data: T[];
}
