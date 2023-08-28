import { isHex, hexToU8a } from '@polkadot/util';
import { decodeAddress, encodeAddress } from '@polkadot/keyring';
export class Account {
  constructor(private _address: string, private _threshold: number) {
    if (!this.isValidAddressPolkadotAddress(_address)) {
      throw new Error('The Polkadot Address is not valid.');
    }
    if (isNaN(_threshold) || _threshold == null) {
      throw new Error('The threshold is not a number');
    }
  }
  get address(): string {
    return this._address;
  }
  get threshold(): number {
    return this._threshold;
  }
  toString(): string {
    return `Address: ${this.address} + ${this.threshold}`;
  }

  private isValidAddressPolkadotAddress(address: string): boolean {
    try {
      encodeAddress(
        isHex(address) ? hexToU8a(address) : decodeAddress(address)
      );

      return true;
    } catch (error) {
      return false;
    }
  }
}
