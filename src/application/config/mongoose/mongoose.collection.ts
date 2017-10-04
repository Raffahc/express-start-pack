import { container } from '../../../injection/inversify.config';
import { TMongooseManager } from './mongoose.manager';

export function Collection(name: string) {
    const manager = container.get(TMongooseManager);

    return (target: any) => {
        console.log(name);
        console.log(target);
    };
}
