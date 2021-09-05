import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import { Errors } from './common/errors';
import { handleErrors } from './middlewares/error.middleware';
import requestLogger from './middlewares/requestLogger.middleware';
import { routes } from './routes/index.routes';

class App {
  public app: express.Application;
  public port: string | number;
  public isProd: boolean;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.isProd = process.env.NODE_ENV === 'production' ? true : false;

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on port ${this.port} ${process.env.NODE_ENV}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    if (this.isProd) {
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(cors({ origin: process.env.DOMAIN, credentials: true }));
    } else {
      this.app.use(cors({ origin: true, credentials: true }));
    }
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(requestLogger);
  }

  private initializeRoutes() {
    this.app.use('/', routes());

    this.app.all('*', (req, res) => {
      return res.status(404).json({
        status: false,
        error: 'not_found',
        message: Errors.RESOURCE_NOT_FOUND,
        path: req.url,
        data: {}
      });
    });
  }

  private initializeErrorHandling() {
    this.app.use(handleErrors);
  }
}

export default App;
