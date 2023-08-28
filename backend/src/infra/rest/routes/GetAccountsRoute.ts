import { Application } from 'express';
import { Route } from './Route';
import { AccountsController } from '../controllers/AccountsController';
export class GetAccounts implements Route {
  constructor(private accountsController: AccountsController) {}
  mountRoute(application: Application): void {
    application
      .route('/api/v1/accounts')
      .get(this.accountsController.retrieveAccounts);
  }
}
