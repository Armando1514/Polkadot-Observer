import express from 'express';
import { Route } from './routes/Route';
import cors from 'cors';
export class Application {
  private expressApp: express.Application = express();

  constructor(private routeList: Route[]) {
    this.expressApp.use(express.json());
    this.expressApp.use(cors());
    routeList.forEach((route) => route.mountRoute(this.expressApp));
  }
  getExpressApplication(): express.Application {
    return this.expressApp;
  }
}
