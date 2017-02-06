"use strict";
const express_1 = require("express");
const events = require('./mocks/events');
class eventRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all Events.
     * Returns all the non deleted events by default
     * With query 'allDel=del' the return includes all the deleted events.
     * With query 'date=YYYY-MM-DD-YYYY-MM-DD' returns only the events between  the specified dates (current month view).
     */
    getAllEvents(req, res, next) {
        /**
         * let month = req.query.date; DEPRECATED
         * let start = new Date(req.query.start);
         * let end = new Date(req.query.end);
         * let allDel = req.query.allDel;
         */
        if (req.query.start && req.query.end) {
            let start = new Date(req.query.start);
            let end = new Date(req.query.end);
            let data = [];
            events.forEach((ev) => {
                let evDate = new Date(ev.start);
                if (ev.deleted != 'true' && !ev.deleted) {
                    if (evDate >= start && evDate <= end) {
                        data.push(ev);
                    }
                }
            });
            res.status(200)
                .send({
                message: 'Success',
                status: res.status,
                data
            });
        }
        else if (req.query.allDel) {
            res.status(200)
                .send({
                message: 'Success',
                status: res.status,
                events
            });
        }
        else {
            let data = [];
            events.forEach((ev) => {
                if (ev.deleted !== true) {
                    data.push(ev);
                }
            });
            res.status(200)
                .send({
                message: 'Success',
                status: res.status,
                data
            });
        }
    }
    /**
     * GET all Events with deleted.
     * Returns all the existing events, even those deleted.
     */
    getAllEventsWithDeleted(req, res, next) {
        res.status(200)
            .send({
            message: 'Success',
            status: res.status,
            events
        });
    }
    /**
     * GET one event by id
     */
    getEvent(req, res, next) {
        let query = parseInt(req.params.id);
        let event = events.find(event => event.id === query);
        if (event) {
            res.status(200)
                .send({
                message: 'Success',
                status: res.status,
                event
            });
        }
        else {
            res.status(404)
                .send({
                message: 'No events found.',
                status: res.status
            });
        }
    }
    /**
     * POST one event
     */
    addEvent(req, res, next) {
        let event = req.body;
        if (event) {
            events.push(event);
            res.status(200)
                .send({
                message: 'Success',
                status: res.status
            });
        }
        else {
            res.status(405)
                .send({
                message: 'Unexpected content.',
                status: res.status
            });
        }
    }
    /**
     * UPDATE an event
     */
    updateEvent(req, res, next) {
        let query = parseInt(req.params.id);
        if (events.find(event => event.id === query)) {
            let index = events.findIndex(event => event.id === query);
            let event = req.body;
            events[index] = event;
            res.status(200)
                .send({
                message: 'Success',
                status: res.status
            });
        }
        else {
            res.status(404)
                .send({
                message: 'No event found.',
                status: res.status
            });
        }
    }
    /**
     * DELETE an event
     * Set the attribute "deleted" to true
     */
    deleteEvent(req, res, next) {
        let query = parseInt(req.params.id);
        if (query) {
            let index = events.findIndex(event => event.id === query);
            if (index >= 0) {
                events[index].deleted = true;
                res.status(200)
                    .send({
                    message: 'Success',
                    status: res.status
                });
            }
            else {
                res.status(404)
                    .send({
                    message: 'Event not found.',
                    status: res.status
                });
            }
        }
        else {
            res.status(400)
                .send({
                message: 'Invalid input.',
                status: res.status
            });
        }
    }
    init() {
        this.router.get('/', this.getAllEvents);
        this.router.get('/:id', this.getEvent);
        this.router.post('/', this.addEvent);
        this.router.put('/:id', this.updateEvent);
        this.router.delete('/:id', this.deleteEvent);
    }
}
exports.eventRouter = eventRouter;
const eventrouter = new eventRouter();
eventrouter.init();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = eventrouter.router;
