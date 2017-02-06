import { Router, Request, Response, NextFunction } from 'express';
const EventTypes = require('./mocks/eventTypes');

export class eventTypeRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * GET all EventTypes.
     */
    public getAllEventTypes(req: Request, res: Response, next: NextFunction) {
        res.send(EventTypes);
    }

    /**
      * GET one eventType by id
      */
    public getEventType(req: Request, res: Response, next: NextFunction) {
        let query = parseInt(req.params.id);
        let eventType = EventTypes.find(eventType => eventType.id === query);
        if (eventType) {
            res.status(200)
                .send({
                    message: 'Success',
                    status: res.status,
                    eventType
                });
        }
        else {
            res.status(404)
                .send({
                    message: 'No event type found.',
                    status: res.status
                });
        }
    }
    init() {
        this.router.get('/', this.getAllEventTypes);
        this.router.get('/:id', this.getEventType);
    }

}
const eventtyperouter = new eventTypeRouter();
eventtyperouter.init();

export default eventtyperouter.router;
