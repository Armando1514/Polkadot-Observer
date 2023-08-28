import { Account } from '../model/Account';
import { AccountRepository } from '../../infra/repository/AccountRepository';

export class AccountStorer {
  constructor(private accountRepository: AccountRepository) {}
  async storeAccount(account: Account): Promise<void> {
    await this.accountRepository.storeAccount(account);
  }
}
