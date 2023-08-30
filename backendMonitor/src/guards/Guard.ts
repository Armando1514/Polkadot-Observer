export interface Guard<T> {
  monitor(markers: T): void;
}
