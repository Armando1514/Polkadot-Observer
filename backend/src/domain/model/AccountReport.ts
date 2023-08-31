export class AccountReport {
  constructor(private _address: string, private _blockNumber: number) {}
  get address(): string {
    return this._address;
  }
  get blockNumber(): number {
    return this._blockNumber;
  }
  toString(): string {
    return `Address: ${this.address}, Block Number: ${this.blockNumber}`;
  }
}
