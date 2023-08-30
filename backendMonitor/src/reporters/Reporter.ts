export interface Reporter<T> {
  report(content: T): void;
}
