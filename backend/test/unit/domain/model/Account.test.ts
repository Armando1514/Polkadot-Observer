import { Account } from '../../../../src/domain/model/Account';

describe('Account Test', () => {
  it('should create an instance of Account', () => {
    expect(
      new Account(
        '0x056a6a4e203766ffbea3146967ef25e9daf677b14dc6f6ed8919b1983c9bebbc',
        4.4
      )
    ).toBeInstanceOf(Account);
  });
  it('should throw an error when the address is not valid', () => {
    expect(() => new Account('w', 3)).toThrowError();
  });

  it('should throw an error when the threshold is not a number', () => {
    expect(
      () =>
        new Account(
          '0x056a6a4e203766ffbea3146967ef25e9daf677b14dc6f6ed8919b1983c9bebbc',
          undefined
        )
    ).toThrowError();
  });
});
