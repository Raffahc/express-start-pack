import { hostname } from 'os';
import * as bluebird from 'Bluebird';
import { MongoError } from 'mongodb';
import { ConnectionOptions, Mongoose } from 'mongoose';

export class MongooseConfiguration {

    constructor(
        private mongoose: Mongoose
    ) { }

    get connectionOptions(): ConnectionOptions {
        return {
            config: { autoIndex: false },
        };
    }

    setConfigrations() {
        this.configLoggers();
        this.configPromise();
        this.configDebug();
    }

    onConnectionSuccess() { }

    onConnectionError(error: MongoError) {
        console.log(' MONGOOSE FAILED TO INITIALIZE THE CONNECTION! ');
        console.log(error);
        console.log(' ');
    }

    private configLoggers() {
        this.mongoose.connection.on('open', () => {
            console.log(' MONGOOSE CONNECTION OPENED. ');
            console.log(' MONGOOSE CONNECTED AT: ', process.env.MONGODB_URI + '/' + process.env.MONGODB_DATABASE);
            console.log(' ');
        });

        this.mongoose.connection.on('error', (error: any) => {
            console.log(' MONGOOSE CONNECTION ERROR! VERIFY IF MONGODB IS RUNNING. ');
            console.log(' ERROR: ', error);
            console.log(' ');
        });
    }

    private configDebug() {
        this.mongoose.set('debug', true);
    }

    private configPromise() {
        this.mongoose.Promise = bluebird;
    }

}
