import { isHex, hexToU8a } from '@polkadot/util';
import { decodeAddress, encodeAddress } from '@polkadot/keyring';
export class Account {
  constructor(private address: string, private threshold: number) {
    if (!this.isValidAddressPolkadotAddress(address)) {
      throw new Error('The Polkadot Address is not valid.');
    }
    if (isNaN(threshold) || threshold == null) {
      throw new Error('The threshold is not a number');
    }
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
