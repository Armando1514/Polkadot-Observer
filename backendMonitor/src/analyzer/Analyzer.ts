export interface Analyzer<T> {
  runSingle(data: T): T | undefined;
  runBatch(data: T[]): any;
}
