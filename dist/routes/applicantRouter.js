"use strict";
const express_1 = require("express");
const Applicants = require('./mocks/applicants');
class applicantRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all Applicants.
     */
    getAllApplicants(req, res, next) {
        res.send(Applicants);
    }
    /**
     * GET one Applicant by id.
     */
    getApplicant(req, res, next) {
        let query = parseInt(req.params.id);
        let applicant = Applicants.find(applicant => applicant.id === query);
        if (applicant) {
            res.status(200)
                .send({
                message: 'Success',
                status: res.status,
                applicant
            });
        }
        else {
            res.status(404)
                .send({
                message: 'No applicants found.',
                status: res.status
            });
        }
    }
    init() {
        this.router.get('/', this.getAllApplicants);
        this.router.get('/:id', this.getApplicant);
    }
}
exports.applicantRouter = applicantRouter;
const applicantrouter = new applicantRouter();
applicantrouter.init();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = applicantrouter.router;
