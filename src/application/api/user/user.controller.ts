import { inject } from 'inversify';
import { httpGet } from 'inversify-express-utils';

import { TUserService, UserService } from './user.service';

export const TUserController = 'UserController';
// @provideNamed(TYPE.Controller, TUserController)
// @controller('/api/user')
export class UserController {

    constructor(
        @inject(TUserService) private userService: UserService
    ) { }

    @httpGet('/')
    public getUsers() {
        // return this.userService.getUsers();
    }
}
