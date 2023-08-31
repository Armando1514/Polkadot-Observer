import { AccountAnalyzer } from '../../../../src/analyzer/accounts/AccountAnalyzer';
import { Account } from '../../../../src/model/Account';
describe('Account Reader Test', () => {
  beforeEach(async () => {
    AccountAnalyzer.getInstance().resetHashMap();
  });
  const accountIncorrectHash = new Account('ciao', 2);
  const accountIncorrectThreshold = new Account(
    '0xe571ec90f411d6b0e26f6597470c397b9998df8772bda34adf7aea6e8adb0335',
    undefined
  );
  const correctAccount1 = new Account(
    '0x903182d757c49195dbb6873788be00ac8f444145993458a7102a6edca2826b75',
    1
  );
  const correctAccount2 = new Account(
    '0xce73267ed8316b4350672f32ba49af86a7ae7af1267beb868a27f3fda03c044a',
    2
  );

  const analyzer = AccountAnalyzer.getInstance();

  it('should return the two accounts analyzed', () => {
    const cleanedAccounts = analyzer.run([correctAccount1, correctAccount2]);
    expect(cleanedAccounts.size).toEqual(2);
  });

  it('should insert only one account  if the second one has invalid key', () => {
    const cleanedAccounts = analyzer.run([
      correctAccount1,
      accountIncorrectHash,
    ]);
    expect(cleanedAccounts.size).toEqual(1);
  });
  it('should insert only one account with  if the second one has invalid threshold', () => {
    const cleanedAccounts = analyzer.run([
      correctAccount1,
      accountIncorrectThreshold,
    ]);
    expect(cleanedAccounts.size).toEqual(1);
  });

  it('should insert only one account if the second one is a duplicate', () => {
    const cleanedAccounts = analyzer.run([correctAccount1, correctAccount1]);
    expect(cleanedAccounts.size).toEqual(1);
  });
});
