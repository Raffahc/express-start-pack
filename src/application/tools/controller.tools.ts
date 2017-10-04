import { NextFunction } from 'express';

export class ControllerTools {

    static logError(error: any, next: NextFunction) {
        console.log(error);
        next(error);
    }

}
