import './injection/singleton.injection';
import './injection/transient.injection';

import * as dotenv from 'dotenv';

import { ApplicationModule } from './application/application.module';
import { container } from './injection/inversify.config';
import { InversifyLogger } from './injection/inversify.logger';

export class Index {
    private applicationModule: ApplicationModule;
    private inversifyLogger: InversifyLogger;
    constructor() {
        dotenv.config({ path: '.env' });

        this.onInit();
    }

    private onInit() {
        this.inversifyLogger = new InversifyLogger(container);
        this.inversifyLogger.logInjectionMap();
        this.applicationModule = container.get(ApplicationModule);
    }

    start() {
        this.applicationModule.startApplication();
    }
}

new Index().start();
