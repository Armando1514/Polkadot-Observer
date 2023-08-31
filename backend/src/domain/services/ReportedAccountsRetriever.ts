import { ReportedAccountsRepository } from '../../infra/repository/ReportedAccountsRepository';
import { AccountReport } from '../model/AccountReport';

export class ReportedAccountsRetriever {
  constructor(private reportedAccountRepository: ReportedAccountsRepository) {}
  async retrieveReportedAccounts(): Promise<AccountReport[]> {
    const reportedAccounts =
      await this.reportedAccountRepository.retrieveReportedAccounts();
    return reportedAccounts;
  }
}
