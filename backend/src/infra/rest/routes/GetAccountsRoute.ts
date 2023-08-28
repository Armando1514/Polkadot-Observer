import { Application } from 'express';
import { Route } from './Route';
import { GetAccountsController } from '../controllers/GetAccountsController';
export class GetAccountsRoute implements Route {
  constructor(private accountsController: GetAccountsController) {}
  mountRoute(application: Application): void {
    application
      .route('/api/v1/accounts')
      .get(this.accountsController.retrieveAccounts);
  }
}
