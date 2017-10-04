import * as bcrypt from 'bcrypt-nodejs';
import { NextFunction } from 'express';
import { Schema, SchemaDefinition } from 'mongoose';

import { options } from '../../config/mongoose/mongoose.schema-options';
import { IAuth } from './auth.model';

export const SAuth = 'auth';

const definitions: SchemaDefinition = {
    email: String,
    password: String,
    userId: String
};

class BaseSchema {
    schema: Schema;

    constructor() {
        this.schema = new Schema(definitions, options);

        this.configPre();
        this.configMethods();
    }

    private configPre() {
        this.preSave();
    }

    private configMethods() {
        this.methodsComparePassword();
    }

    private preSave() {
        this.schema.pre('save', function (next: NextFunction) {
            const auth: IAuth = this;

            if (!auth.isModified('password')) {
                return next();
            }

            bcrypt.genSalt(10, (error: Error, salt: string) => {
                if (error) { return next(error); }

                bcrypt.hash(auth.password, salt, undefined, (error: Error, hash: string) => {
                    if (error) { return next(error); }

                    auth.password = hash;
                    next();
                });
            });
        });
    }

    private methodsComparePassword() {
        this.schema.methods.comparePassword = function (password: string, callback: (error: Error, isMatch: boolean) => Object) {
            const auth: IAuth = this;

            bcrypt.compare(password, auth.password, callback);
        };
    }

}

export const AuthSchema = new BaseSchema().schema;
