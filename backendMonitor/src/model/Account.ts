export class Account {
  constructor(private _address: string, private _threshold: number) {}
  get address(): string {
    return this._address;
  }
  get threshold(): number {
    return this._threshold;
  }
  toString(): string {
    return `Address: ${this.address}, Threshold: ${this.threshold}`;
  }
}
