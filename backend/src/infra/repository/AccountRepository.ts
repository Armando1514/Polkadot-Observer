import { Account } from '../../domain/model/Account';

export interface AccountRepository {
  retrieveAccounts(): Promise<Account[] | null>;
  storeAccount(address: string, threshold: number): Promise<void>;
}
