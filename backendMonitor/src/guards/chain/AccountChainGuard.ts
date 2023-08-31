import { Account } from '../../model/Account';
import { AccountReport } from '../../model/AccountReport';
import { MongoAccountReportedRepository } from '../../reporters/database/accountsReported/MongoAccountReportedRepository';
import { Guard } from '../Guard';
import { ChainConnector } from './ChainConnector';

export class AccountChainGuard
  implements Guard<Map<string, Account>, AccountReport>
{
  async monitor(
    accounts: Map<string, Account>,
    reporters: MongoAccountReportedRepository[]
  ): Promise<void> {
    const addressList = [...accounts.keys()];
    try {
      const connector = await ChainConnector.getInstance();

      await connector.api.query.system.account.multi(
        addressList,
        (accountInfos) => {
          accountInfos.forEach(async (accountInfo, index) => {
            const address = addressList[index];
            const accountThreshold = accounts.get(addressList[index]).threshold;
            const freeBalance = accountInfo.data.free.toNumber();

            if (this.compareOnlyFirst5Digits(freeBalance, accountThreshold)) {
              const blockNumber = (
                await connector.api.query.system.number()
              ).toNumber();

              const accountToReport = new AccountReport(address, blockNumber);
              reporters.forEach(async (reporter) =>
                reporter.report(accountToReport)
              );
            }
          });
        }
      );
    } catch (error) {
      console.log(
        `There was an error connecting to the chain, Error: ${error}`
      );
    }
  }
  private compareOnlyFirst5Digits(
    polkadotBalance: number,
    thresholdNumber: number
  ): boolean {
    const polkadotBalanceString = polkadotBalance.toString();
    const shorterNumberString = thresholdNumber.toString();

    // Extract the first 5 characters from the strings
    const polkadotFirst5Digits = polkadotBalanceString.slice(0, 5);
    const thresholdNumberFirst5Digits = shorterNumberString.slice(0, 5);

    return thresholdNumberFirst5Digits > polkadotFirst5Digits;
  }
}
