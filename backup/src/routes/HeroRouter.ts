import { Router, Request, Response, NextFunction } from 'express';
const Heroes = require('../data');

export class HeroRouter {
    router: Router

    /**
     * Initialize the HeroRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * GET all Heroes.
     */
    public getAll(req: Request, res: Response, next: NextFunction) {
        res.send(Heroes);
    }

    /**
     * GET one hero by id
     */
    public getOne(req: Request, res: Response, next: NextFunction) {
        let query = parseInt(req.params.id);
        let hero = Heroes.find(hero => hero.id === query);
        if (hero) {
            res.status(200)
                .send({
                    message: 'Success',
                    status: res.status,
                    hero
                });
        }
        else {
            res.status(404)
                .send({
                    message: 'No hero found with the given id.',
                    status: res.status
                });
        }
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        /**
         * @swagger
         * definition:
         *   Heroes:
         *     properties:
         *       id:
         *         type: string
         */
        /**
         * @swagger
         * /api/v1/heroes:
         *   get:
         *     tags:
         *       - heroes
         *     description: Returns all heroes
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: An array of heroes
         *         schema:
         *           $ref: '#/definitions/heroes'
         */
        this.router.get('/', this.getAll)
        /**
        * @swagger
        * /api/v1/heroes/{id}:
        *   get:
        *     tags:
        *       - heroes
        *     description: Returns a single heroe
        *     produces:
        *       - application/json
        *     parameters:
        *       - name: id
        *         description: heroe id
        *         in: path
        *         required: true
        *         type: integer
        *     responses:
        *       200:
        *         description: A single heroes
        *         schema:
        *           $ref: '#/definitions/heroes'
       */
        this.router.get('/:id', this.getOne);
    }

}

// Create the HeroRouter, and export its configured Express.Router
const heroRoutes = new HeroRouter();
heroRoutes.init();

export default heroRoutes.router;
