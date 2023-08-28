import { Request, Response, NextFunction } from 'express';
import { AccountsRetriever } from '../../../domain/services/AccountsRetriever';
export class AccountsController {
  constructor(private accountsRetriever: AccountsRetriever) {}
  retrieveAccounts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const accounts = await this.accountsRetriever.retrieveAccounts();
      res.status(200).json(accounts);
    } catch (error) {
      next(error);
    }
  };
}
