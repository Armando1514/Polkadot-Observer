import { Application } from 'express';
import { Route } from './Route';
import { SaveAccountController } from '../controllers/SaveAccountController';
export class SaveAccountRoute implements Route {
  constructor(private saveAccountController: SaveAccountController) {}
  mountRoute(application: Application): void {
    application
      .route('/api/v1/accounts')
      .post(this.saveAccountController.storeAccount);
  }
}
