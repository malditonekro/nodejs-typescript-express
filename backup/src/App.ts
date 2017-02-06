import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as swaggerJSDoc from 'swagger-jsdoc';
import * as cookieParser from 'cookie-parser';
import HeroRouter from './routes/HeroRouter';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.swagger();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    // view engine setup
    this.express.set('views', path.join(__dirname, 'views'));
    this.express.set('view engine', 'jade');
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    // this.express.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    this.express.use(cookieParser());
    this.express.use(express.static(path.join(__dirname, 'public')));
  }

  // Swagger integration
  private swagger(): void {
    let swaggerDefinition = {
      info: {
        title: 'Trabajando.com API',
        version: '1.0.0',
        description: 'API Rest Trabajando.com Web Components',
      },
      host: 'localhost:3000',
      basePath: '/',
    };

    let options = {
      swaggerDefinition: swaggerDefinition,
      // Path for API Docs
      apis: ['./routes/HeroRouter'],
    };

    let swaggerSpec = swaggerJSDoc(options);

    this.express.get('/swagger.json', function (req, res) {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
    });
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Trabajando.com - API for Developers'
      });
    });
    this.express.use('/', router);
    this.express.use('/api/heroes', HeroRouter);
  }

}

export default new App().express;
