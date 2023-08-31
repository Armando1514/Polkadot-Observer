import { Application } from 'express';
import { Route } from './Route';
import { GetReportedAccountsController } from '../controllers/GetReportedAccountsController';
export class GetReportedAccountsRoute implements Route {
  constructor(
    private reportedAccountsController: GetReportedAccountsController
  ) {}
  mountRoute(application: Application): void {
    application
      .route('/api/v1/accounts/reported')
      .get(this.reportedAccountsController.retrieveReportedAccounts);
  }
}
