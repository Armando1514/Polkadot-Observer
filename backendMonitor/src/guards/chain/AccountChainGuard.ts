import { Account } from '../../model/Account';
import { AccountReport } from '../../model/AccountReport';
import { MongoAccountReportedRepository } from '../../reporters/database/accountsReported/MongoAccountReportedRepository';
import { Guard } from '../Guard';
import { ChainConnector } from './ChainConnector';
import { BN, formatBalance } from '@polkadot/util';

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

            if (
              this.compareBalanceAndThreshold(freeBalance, accountThreshold)
            ) {
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
  private compareBalanceAndThreshold(
    polkadotBalance: number,
    thresholdNumber: number
  ): boolean {
    // TO UNIT
    const formattedBalance = parseFloat(
      formatBalance(new BN(polkadotBalance), {
        withSi: false,
        forceUnit: '-',
        decimals: 12,
      })
    );

    return formattedBalance < thresholdNumber;
  }
}
