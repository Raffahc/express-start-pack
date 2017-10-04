import { Container } from 'inversify';
import { makeLoggerMiddleware } from 'inversify-logger-middleware';

export class InversifyLogger {

    constructor(
        private container: Container
    ) { }

    logInjectionMap() {
        this.container.applyMiddleware(makeLoggerMiddleware());
    }

}
