"use strict";
const express_1 = require("express");
var base64Key = "eT/VwaIFNnqX0Nz3lyyncA==";
var Client = require('node-rest-client').Client;
var CryptoJS = require("crypto-js");
const Applicants = require('./mocks/applicants');
class bypassRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getUniversalBypass(req, res, next) {
        req = CryptoJS.AES.decrypt(req.toString(), base64Key).toString(CryptoJS.enc.Utf8);
        var client = new Client();
        switch (req.body.datacenter) {
            case 'la':
                var url_service = 'http://wsbcknd.trabajando.com/' + req.body.params;
                break;
            case 'es':
                var url_service = 'http://wsbcknd.trabajando.es/' + req.body.params;
                break;
            default:
                ;
        }
        switch (req.body.method) {
            case 'GET':
                client.get(url_service, function (data, response) {
                    res.status(200)
                        .send({
                        data: data,
                        status: res.status
                    });
                    res.status(500)
                        .send({
                        data: { response: 'Invalid Request', host: 'www.trabajando.com' },
                        status: res.status
                    });
                    res.status(404)
                        .send({
                        data: { response: 'Invalid Request', host: 'www.trabajando.com' },
                        status: res.status
                    });
                    res.status(415)
                        .send({
                        data: { response: 'Invalid Request', host: 'www.trabajando.com' },
                        status: res.status
                    });
                    res.status(301)
                        .send({
                        data: { response: 'Invalid Request', host: 'www.trabajando.com' },
                        status: res.status
                    });
                });
                break;
            case 'POST':
                var args = {
                    data: req.body.object,
                    headers: { "Accept": "application/json", "Content-Type": "application/json" }
                };
                client.post(url_service, args, function (data, response) {
                    res.status(200)
                        .send({
                        data: data,
                        status: res.status
                    });
                    res.status(500)
                        .send({
                        data: { response: 'Invalid Request', host: 'www.trabajando.com' },
                        status: res.status
                    });
                    res.status(404)
                        .send({
                        data: { response: 'Invalid Request', host: 'www.trabajando.com' },
                        status: res.status
                    });
                    res.status(415)
                        .send({
                        data: { response: 'Invalid Request', host: 'www.trabajando.com' },
                        status: res.status
                    });
                    res.status(301)
                        .send({
                        data: { response: 'Invalid Request', host: 'www.trabajando.com' },
                        status: res.status
                    });
                });
                break;
            case 'PUT':
                var args = {
                    data: req.body.object,
                    headers: { "Accept": "application/json", "Content-Type": "application/json" }
                };
                client.put(url_service, args, function (data, response) {
                    res.status(200)
                        .send({
                        data: data,
                        status: res.status
                    });
                    res.status(500)
                        .send({
                        data: { response: 'Invalid Request', host: 'www.trabajando.com' },
                        status: res.status
                    });
                    res.status(404)
                        .send({
                        data: { response: 'Invalid Request', host: 'www.trabajando.com' },
                        status: res.status
                    });
                    res.status(415)
                        .send({
                        data: { response: 'Invalid Request', host: 'www.trabajando.com' },
                        status: res.status
                    });
                    res.status(301)
                        .send({
                        data: { response: 'Invalid Request', host: 'www.trabajando.com' },
                        status: res.status
                    });
                });
                break;
            default:
                res.status(200)
                    .send({
                    data: { response: 'Invalid Request', host: 'www.trabajando.com' },
                    status: res.status
                });
                res.status(500)
                    .send({
                    data: { response: 'Invalid Request', host: 'www.trabajando.com' },
                    status: res.status
                });
                res.status(404)
                    .send({
                    data: { response: 'Invalid Request', host: 'www.trabajando.com' },
                    status: res.status
                });
                res.status(415)
                    .send({
                    data: { response: 'Invalid Request', host: 'www.trabajando.com' },
                    status: res.status
                });
                res.status(301)
                    .send({
                    data: { response: 'Invalid Request', host: 'www.trabajando.com' },
                    status: res.status
                });
                ;
        }
    }
    init() {
        this.router.post('/', this.getUniversalBypass);
    }
}
exports.bypassRouter = bypassRouter;
const bypassrouter = new bypassRouter();
bypassrouter.init();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = bypassrouter.router;
