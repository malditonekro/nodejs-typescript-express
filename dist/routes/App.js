"use strict";
const path = require("path");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
//import * as swaggerJSDoc from 'swagger-jsdoc';
const cookieParser = require("cookie-parser");
const applicantRouter_1 = require("./routes/applicantRouter");
const eventRouter_1 = require("./routes/eventRouter");
const eventTypeRouter_1 = require("./routes/eventTypeRouter");
const bypassRouter_1 = require("./routes/bypassRouter");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
    }
    middleware() {
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
        this.express.use('/api/applicants', applicantRouter_1.default);
        // Booking Services
        this.express.use('/api/events', eventRouter_1.default);
        this.express.use('/api/eventTypes', eventTypeRouter_1.default);
        // Universal Bypass for SOA Services
        this.express.use('/api/shared', bypassRouter_1.default);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new App().express;
