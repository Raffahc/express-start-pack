import { Mongoose } from 'mongoose';

import { provideSingleton } from '../../../injection/inversify.config';
import { MongooseConfiguration } from './mongoose.config';

export const TMongooseManager = 'MongooseManager';

@provideSingleton(TMongooseManager)
export class MongooseManager {

    private configuration: MongooseConfiguration;

    mongoose: Mongoose;

    constructor() {
        this.onInit();
    }

    private onInit() {
        this.mongoose = new Mongoose();
        this.configuration = new MongooseConfiguration(this.mongoose);
        this.configuration.setConfigrations();
    }

    connect() {
        this.mongoose.connect(
            process.env.MONGODB_URI + '/' + process.env.MONGODB_DATABASE,
            this.configuration.connectionOptions
        ).then(
            this.configuration.onConnectionSuccess,
            this.configuration.onConnectionError
            );
    }

}
