import 'reflect-metadata';

import { Container } from 'inversify';
import { makeFluentProvideDecorator, makeProvideDecorator } from 'inversify-binding-decorators';

export const container = new Container();
export const provide = makeProvideDecorator(container);
export const fluentProvider = makeFluentProvideDecorator(container);

export const provideNamed = function (identifier: symbol, name: any) {
    return fluentProvider(identifier)
        .whenTargetNamed(name)
        .done();
};

export const provideSingleton = function (identifier: any) {
    return fluentProvider(identifier)
        .inSingletonScope()
        .done();
};
