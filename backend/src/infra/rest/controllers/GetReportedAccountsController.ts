import { Request, Response, NextFunction } from 'express';
import { ReportedAccountsRetriever } from '../../../domain/services/ReportedAccountsRetriever';
export class GetReportedAccountsController {
  constructor(private reportedAccountsRetriever: ReportedAccountsRetriever) {}
  retrieveReportedAccounts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const accounts =
        await this.reportedAccountsRetriever.retrieveReportedAccounts();
      res.status(200).json(accounts);
    } catch (error) {
      next(error);
    }
  };
}
