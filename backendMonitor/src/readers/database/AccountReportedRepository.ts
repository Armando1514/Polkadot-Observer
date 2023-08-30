export interface AccountReportedRepository {
  storeReportedAccount(address: string, blockNumber: number): Promise<void>;
}
