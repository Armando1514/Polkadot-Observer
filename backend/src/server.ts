import { Application } from './infra/rest/Application';
import { Route } from './infra/rest/routes/Route';
import { GetAccountsController } from './infra/rest/controllers/GetAccountsController';
import { GetAccountsRoute } from './infra/rest/routes/GetAccountsRoute';
import { MongoAccountRepository } from './infra/repository/mongo/MongoAccountRepository';
import { AccountsRetriever } from './domain/services/AccountsRetriever';
import { AccountStorer } from './domain/services/AccountStorer';
import { SaveAccountController } from './infra/rest/controllers/SaveAccountController';
import { SaveAccountRoute } from './infra/rest/routes/SaveAccountRoute';

const mongoAccountRepository = new MongoAccountRepository();

const accountsRetrievers = new AccountsRetriever(mongoAccountRepository);
const getAccountsController = new GetAccountsController(accountsRetrievers);
const getAccountsRoute = new GetAccountsRoute(getAccountsController);

const accountStorer = new AccountStorer(mongoAccountRepository);
const saveAccountController = new SaveAccountController(accountStorer);
const saveAccountRoute = new SaveAccountRoute(saveAccountController);

const routeList: Route[] = [];
routeList.push(getAccountsRoute);
routeList.push(saveAccountRoute);

const application = new Application(routeList);

const expressApplication = application.getExpressApplication();

const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  expressApplication.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
export default expressApplication;
