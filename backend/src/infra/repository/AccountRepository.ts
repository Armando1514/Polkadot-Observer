import { Account } from '../../domain/model/Account';

export interface AccountRepository {
  retrieveAccounts(): Promise<Account[] | null>;
  storeAccount(account: Account): Promise<void>;
}
