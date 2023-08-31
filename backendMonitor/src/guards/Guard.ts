import { Reporter } from '../reporters/Reporter';

export interface Guard<T1, T2> {
  monitor(markers: T1, reporters: Reporter<T2>[]): void;
}
