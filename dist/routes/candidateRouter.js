"use strict";
const express_1 = require("express");
const Candidates = require('../data');
class candidateRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all Candidates.
     */
    getAllCandidates(req, res, next) {
        res.send(Candidates);
    }
    /**
     * GET one candidate by id
     */
    getCandidate(req, res, next) {
        let query = parseInt(req.params.id);
        let candidate = Candidates.find(candidate => candidate.id === query);
        if (candidate) {
            res.status(200)
                .send({
                message: 'Success',
                status: res.status,
                candidate
            });
        }
        else {
            res.status(404)
                .send({
                message: 'No candidates found.',
                status: res.status
            });
        }
    }
    init() {
        this.router.get('/', this.getAllCandidates);
        this.router.get('/:id', this.getCandidate);
    }
}
exports.candidateRouter = candidateRouter;
const candidaterouter = new candidateRouter();
candidaterouter.init();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = candidaterouter.router;
