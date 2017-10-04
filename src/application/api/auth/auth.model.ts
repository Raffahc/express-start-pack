import { Document, Model, model } from 'mongoose';

import { AuthSchema } from './auth.schema';

export interface IAuth extends Document {
    email: string;
    password: string;
    userId: string;
    comparePassword: (password: string, callback: (error: any, isMatch: any) => {}) => void;
}
