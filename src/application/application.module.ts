// import './config/injection/dependency.loader';

import { Application } from 'express';
import { inject } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

import { container, provide } from '../injection/inversify.config';
import { ExpressConfiguration } from './config/express/express.config';
import { MongooseManager, TMongooseManager } from './config/mongoose/mongoose.manager';

@provide(ApplicationModule)
export class ApplicationModule {

    private inversifyExpressServer: InversifyExpressServer;
    private configuration: ExpressConfiguration;
    private application: Application;

    constructor(
        @inject(TMongooseManager) private mongooseManager: MongooseManager
    ) {
        this.onInit();
    }

    private onInit() {
        this.mongooseManager.connect();

        this.inversifyExpressServer = new InversifyExpressServer(container);
        this.configApplication();
    }

    private configApplication() {
        this.inversifyExpressServer.setConfig((application: Application) => {
            this.configuration = new ExpressConfiguration(application);
            this.configuration.setConfigurations();
        });
    }

    startApplication() {
        const application = this.inversifyExpressServer.build();

        application.listen(
            application.get('port'),
            this.configuration.onApplicationStart(application)
        );
    }

}
