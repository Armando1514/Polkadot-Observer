import { AccountRepository } from '../../infra/repository/AccountRepository';
import { Account } from '../model/Account';

export class AccountsRetriever {
  constructor(private accountRepository: AccountRepository) {}
  async retrieveAccounts(): Promise<Account[]> {
    const accounts = await this.accountRepository.retrieveAccounts();
    return accounts;
  }
}
