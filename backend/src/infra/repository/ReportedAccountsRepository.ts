import { AccountReport } from '../../domain/model/AccountReport';

export interface ReportedAccountsRepository {
  retrieveReportedAccounts(): Promise<AccountReport[] | null>;
}
