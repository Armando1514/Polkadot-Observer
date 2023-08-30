import { AccountAnalyzer } from '../../../../src/analyzer/accounts/AccountAnalyzer';
import { Account } from '../../../../src/model/Account';
describe('Account Reader Test', () => {
  beforeEach(async () => {
    AccountAnalyzer.getInstance().resetHashMap();
  });
  const accountIncorrectHash = new Account('ciao', 2);
  const accountIncorrectThreshold = new Account(
    '0x903182d757c49195dbb6873788be00ac8f444145993458a7102a6edca2826b75',
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

  it('should keep track of accounts analyzed', () => {
    const hash = analyzer.run([correctAccount1, correctAccount2]);
    expect(hash.size).toEqual(2);
  });

  it('should keep track of accounts with interleaves between singleRun and BatchRun', () => {
    analyzer.run([correctAccount2]);
    const hash = analyzer.run([correctAccount1]);
    expect(hash.size).toEqual(2);
  });

  it('should insert only one account with batchRun if the second one has invalid key', () => {
    const hash = analyzer.run([correctAccount1, accountIncorrectHash]);
    expect(hash.size).toEqual(1);
  });
  it('should insert only one account with batchRun if the second one has invalid threshold', () => {
    const hash = analyzer.run([correctAccount1, accountIncorrectThreshold]);
    expect(hash.size).toEqual(1);
  });

  it('should insert only one account with batchRun if the second one is a duplicate', () => {
    const hash = analyzer.run([correctAccount1, correctAccount1]);
    expect(hash.size).toEqual(1);
  });
});
