import express from 'express';
import { Route } from './routes/Route';
export class Application {
  private expressApp: express.Application = express();

  constructor(private routeList: Route[]) {
    this.expressApp.use(express.json());
    routeList.forEach((route) => route.mountRoute(this.expressApp));
  }
  getExpressApplication(): express.Application {
    return this.expressApp;
  }
}
