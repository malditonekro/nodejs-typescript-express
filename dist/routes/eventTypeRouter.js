"use strict";
const express_1 = require("express");
const EventTypes = require('./mocks/eventTypes');
class eventTypeRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all EventTypes.
     */
    getAllEventTypes(req, res, next) {
        res.send(EventTypes);
    }
    /**
      * GET one eventType by id
      */
    getEventType(req, res, next) {
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
exports.eventTypeRouter = eventTypeRouter;
const eventtyperouter = new eventTypeRouter();
eventtyperouter.init();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = eventtyperouter.router;
