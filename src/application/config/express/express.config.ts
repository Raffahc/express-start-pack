import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as connectMongo from 'connect-mongo';
import { Application } from 'express';
import * as express from 'Express';
import * as expressSession from 'express-session';
import expressValidator = require('express-validator');
import * as logger from 'morgan';
import * as passport from 'passport';
import * as path from 'path';

const lusca = require('lusca');

export class ExpressConfiguration {

    constructor(
        private application: Application
    ) { }

    onApplicationStart(application: Application) {
        return () => {
            console.log(' EXPRESS APPLICATION IS RUNNING. ');
            console.log((' APPLICATION RUNNING AT: http://localhost:%d'), this.application.get('port'));
            console.log((' CURRENT ENVIRONTMENT: %s'), this.application.get('env'));
            console.log(' ');
        };
    }

    setConfigurations() {
        // #PORT
        this.application.set('port', process.env.API_PORT);

        // #FOLDER
        this.application.use(
            express.static(
                path.join(__dirname, '../../../public/'),
                { maxAge: 31557600000 }
            )
        );

        // #MIDDLEWARE
        this.application.use(compression());
        this.application.use(logger('dev'));
        this.application.use(bodyParser.json());
        this.application.use(bodyParser.urlencoded({ extended: true }));
        this.application.use(expressValidator());
        this.application.use(lusca.xframe('SAMEORIGIN'));
        this.application.use(lusca.xssProtection(true));

        // #AUTH
        this.application.use(passport.initialize());
        this.application.use(passport.session());

        // #SESSION
        this.configSession();
    }

    private configSession() {
        const MongoStore = connectMongo(expressSession);

        this.application.use(expressSession({
            resave: true,
            saveUninitialized: true,
            secret: process.env.MONGODB_SESSION_SECRET,
            cookie: {
                maxAge: 900000,
            },
            store: new MongoStore({
                url: process.env.MONGODB_URI + '/' + process.env.MONGODB_DATABASE,
                autoReconnect: true,
            })
        }));
    }

}
