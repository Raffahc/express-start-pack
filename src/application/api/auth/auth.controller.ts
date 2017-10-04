import { NextFunction, Request, Response } from 'express';
import { controller, httpGet, httpPost, request, response, TYPE } from 'inversify-express-utils';

import { provideNamed } from '../../../injection/inversify.config';
import { ControllerTools } from '../../tools/controller.tools';
import { IAuth } from './auth.model';
import { AuthService } from './auth.service';

@provideNamed(TYPE.Controller, 'AuthController')
@controller('/api/auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @httpGet('/')
    getAuthList(
        @request() request: Request,
        @response() response: Response,
        next: NextFunction
        ) {
        this.authService.getAuthList().then(
            (result: Array<IAuth>) => { response.json({ path: ControllerTools.basePath('/auth') }); },

            error => { ControllerTools.logError(error, next); }
        );
    }

    @httpPost('/')
    postAuth(
        @request() request: Request,
        @response() response: Response,
        next: NextFunction
        ) {
        const auth = request.body as IAuth;
        this.authService.newAuth(auth).then(
            (result: IAuth) => { response.json(result); },

            error => { ControllerTools.logError(error, next); }
        );
    }
}
