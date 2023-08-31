import { Account } from '../../model/Account';
import { Analyzer } from '../Analyzer';
import { isHex, hexToU8a } from '@polkadot/util';
import { decodeAddress, encodeAddress } from '@polkadot/keyring';
// SINGLETON
export class AccountAnalyzer implements Analyzer<Account> {
  private static instance: AccountAnalyzer;
  private hashMap: Map<Account['address'], Account> = new Map<
    Account['address'],
    Account
  >();

  public static getInstance(): AccountAnalyzer {
    if (!AccountAnalyzer.instance) {
      AccountAnalyzer.instance = new AccountAnalyzer();
    }

    return AccountAnalyzer.instance;
  }

  run(accounts: Account[]): Map<string, Account> {
    const accountFiltered = accounts
      .filter(this.isCorrectKey)
      .filter(this.isCorrectThreshold)
      .filter((account) => !this.hasDuplicates(account));
    accountFiltered.forEach((account) =>
      this.hashMap.set(account.address, account)
    );

    // Removes the possible duplicates that were in the input,
    // before I have just checked with the already inserted addresses
    return new Map(
      accountFiltered.map((account) => [account.address, account])
    );
  }

  private hasDuplicates(account: Account): boolean {
    return this.hashMap.has(account.address);
  }
  private isCorrectThreshold(account: Account): boolean {
    return !isNaN(account.threshold);
  }
  private isCorrectKey(account: Account): boolean {
    try {
      encodeAddress(
        isHex(account.address)
          ? hexToU8a(account.address)
          : decodeAddress(account.address)
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  // I use this for testing purposes
  resetHashMap() {
    this.hashMap = new Map<Account['address'], Account>();
  }
}
