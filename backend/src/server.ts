import { Application } from './infra/rest/Application';
import { Route } from './infra/rest/routes/Route';
import { AccountsController } from './infra/rest/controllers/AccountsController';
import { GetAccounts } from './infra/rest/routes/GetAccountsRoute';
import { MongoAccountRepository } from './infra/repository/mongo/MongoAccountRepository';
import { AccountsRetriever } from './domain/services/AccountsRetriever';

const accountsRetrievers = new AccountsRetriever(new MongoAccountRepository());

const accountsController = new AccountsController(accountsRetrievers);
const getAccountsRoute = new GetAccounts(accountsController);

const routeList: Route[] = [];
routeList.push(getAccountsRoute);

const application = new Application(routeList);

const expressApplication = application.getExpressApplication();

const port = process.env.PORT || 3001;

expressApplication.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
export default expressApplication;
