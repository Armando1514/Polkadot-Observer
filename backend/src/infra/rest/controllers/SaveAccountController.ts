import { Request, Response, NextFunction } from 'express';
import { Account } from '../../../domain/model/Account';
import { AccountStorer } from '../../../domain/services/AccountStorer';
export class SaveAccountController {
  constructor(private accountStorer: AccountStorer) {}
  storeAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const account = new Account(req.body.address, req.body.threshold);
      await this.accountStorer.storeAccount(account);
      res.status(201).json();
    } catch (error) {
      next(error);
    }
  };
}
