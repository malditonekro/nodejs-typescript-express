import { Router, Request, Response, NextFunction } from 'express';
const Applicants = require('./mocks/applicants');

export class applicantRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }
    /**
     * GET all Applicants.
     */
    public getAllApplicants(req: Request, res: Response, next: NextFunction) {
        res.send(Applicants);
    }
    /**
     * GET one Applicant by id.
     */
    public getApplicant(req: Request, res: Response, next: NextFunction) {
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
const applicantrouter = new applicantRouter();
applicantrouter.init();

export default applicantrouter.router;
