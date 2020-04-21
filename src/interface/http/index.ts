import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { Container } from '../../types/core';
import { IHttpRoute } from '../../types/interface/http';
import { IncidentController } from './controllers/incident';
import { OngController } from './controllers/ong';
import { ProfileController } from './controllers/profile';
import { SessionController } from './controllers/session';

interface IHttpInterface {
  serve(): void;
}

export class HttpInterface implements IHttpInterface {
  private app?: express.Application;
  private coreContainer: Container;

  constructor(config: any) {
    this.coreContainer = config.coreContainer;
  }

  initApp() {
    this.app = express();

    this.app.use(
      cors(),
      bodyParser.json(),
    );
  }

  setupRoutes() {
    [
      new OngController(this.coreContainer),
      new IncidentController(this.coreContainer),
      new ProfileController(this.coreContainer),
      new SessionController(this.coreContainer),
    ]
      .forEach((route: IHttpRoute) => {
        const router = express.Router({ mergeParams: true });
        route.register(router);
        this.app?.use(router);
      });
  }

  setupNotFound() {
    this.app?.use(
      '*',
      (req: express.Request, res: express.Response, next: express.NextFunction) => {
        next(new Error('Page not found'));
      },
    );
  }

  serve(): void {
    this.initApp();
    this.setupRoutes();

    this.setupNotFound();

    this.app?.listen(3000);
  }
}