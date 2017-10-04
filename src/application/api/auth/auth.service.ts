import { IAuth } from './auth.model';
import { inject } from 'inversify';

import { provide } from '../../../injection/inversify.config';
import { MongooseManager, TMongooseManager } from '../../config/mongoose/mongoose.manager';
import { AuthSchema, SAuth } from './auth.schema';

@provide(AuthService)
export class AuthService {

    constructor(
        @inject(TMongooseManager) private mongooseManager: MongooseManager
    ) { }

    getAuthList() {
        const model = this.mongooseManager.mongoose.model(SAuth, AuthSchema);

        return model.find({});
    }

    newAuth(auth: IAuth) {
        const model = this.mongooseManager.mongoose.model(SAuth, AuthSchema);

        return model.create(auth);
    }


}
