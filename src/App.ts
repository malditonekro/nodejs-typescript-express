import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
//import * as swaggerJSDoc from 'swagger-jsdoc';
import * as cookieParser from 'cookie-parser';
import applicantRouter from './routes/applicantRouter';
import eventRouter from './routes/eventRouter';
import eventTypeRouter from './routes/eventTypeRouter';
import bypassRouter from './routes/bypassRouter';

// Creates and configures an ExpressJS web server.
class App {
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
  }

  
  private middleware(): void {    
    this.express.set('views', path.join(__dirname, 'views'));
    this.express.set('view engine', 'jade');
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    // this.express.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    this.express.use(cookieParser());
    this.express.use(express.static(path.join(__dirname, 'public')));
    let router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Trabajando.com API REST'
      });
    });
    this.express.use(function (req, res, next) {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', "true");
        // Pass to next layer of middleware
        next();
    });
    // Init
    this.express.use('/', router);
    // Temporal
    this.express.use('/api/applicants', applicantRouter); 
    // Booking Services
    this.express.use('/api/events', eventRouter); 
    this.express.use('/api/eventTypes', eventTypeRouter);
    // Universal Bypass for SOA Services
    this.express.use('/api/shared', bypassRouter);
  }
}
export default new App().express;
