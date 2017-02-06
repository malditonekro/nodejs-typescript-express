import { Router, Request, Response, NextFunction } from 'express';
import { Event } from '../models/event.model';

const events = require('./mocks/events');

export class eventRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * GET all Events.
     * Returns all the non deleted events by default
     * With query 'allDel=del' the return includes all the deleted events.
     * With query 'date=YYYY-MM-DD-YYYY-MM-DD' returns only the events between  the specified dates (current month view).
     */
    public getAllEvents(req: Request, res: Response, next: NextFunction) {
        /**
         * let month = req.query.date; DEPRECATED
         * let start = new Date(req.query.start);
         * let end = new Date(req.query.end);
         * let allDel = req.query.allDel;
         */
        if(req.query.start && req.query.end){ // Returns the non-deleted events of the current view (month).
            let start = new Date(req.query.start);
            let end = new Date(req.query.end);
            let data:Event[] = [];
            events.forEach(
                (ev) =>
                    {
                        let evDate = new Date(ev.start);
                        if(ev.deleted!='true' && !ev.deleted){
                            if( evDate >= start && evDate <= end ){                            
                                data.push(ev);
                            }
                        }                        
                    }
            );
            res.status(200)
                .send({
                    message: 'Success',
                    status: res.status,
                    data
                });
        }else if(req.query.allDel){ // With query 'date=YYYY-MM' returns only the events of the specified month.
            res.status(200)
            .send({
                message: 'Success',
                status: res.status,
                events
            });
        }else{ // DEFAULT - Returns all the non deleted events.
            let data: Event[] = [];
            events.forEach(
                (ev) =>
                    {
                        if(ev.deleted !== true){
                            data.push(ev);
                        }
                    }   
            );
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
    public getAllEventsWithDeleted(req: Request, res: Response, next: NextFunction) {
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
    public getEvent(req: Request, res: Response, next: NextFunction) {
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
    public addEvent(req: Request, res: Response, next: NextFunction){
        let event:Event = req.body;
        if(event){
            events.push(event);
            res.status(200)
                .send({
                    message: 'Success',
                    status: res.status
                });
        }else{
            res.status(405)
                .send({
                    message: 'Unexpected content.',
                    status: res.status
                })
        }
    }
    /**
     * UPDATE an event
     */
    public updateEvent(req: Request, res: Response, next: NextFunction) {
        let query = parseInt(req.params.id);
        if (events.find(event => event.id === query)) {
            let index = events.findIndex(event => event.id === query);
            let event:Event = req.body
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
    public deleteEvent(req: Request, res: Response, next: NextFunction) {
        let query = parseInt(req.params.id);
        if (query) {
            let index = events.findIndex(event => event.id === query);
            if(index>=0){
                events[index].deleted = true;
                res.status(200)
                .send({
                    message: 'Success',
                    status: res.status
                });            
            }else{
                res.status(404)
                .send({
                    message: 'Event not found.',
                    status: res.status
            });
            }               
            
        }else {
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
const eventrouter = new eventRouter();
eventrouter.init();

export default eventrouter.router;
