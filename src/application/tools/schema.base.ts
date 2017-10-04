import { Document, Schema, SchemaDefinition, SchemaOptions } from 'mongoose';


export abstract class SchemaBase<T extends Document> {

    protected abstract schema: Schema;

    protected abstract readonly name: string;

    protected readonly options: SchemaOptions = {
        timestamps: {}
    };

    protected abstract readonly definitions: SchemaDefinition;

    constructor() { }

    defineSchema() {
        this.schema = new Schema(this.definitions, this.options);
        this.setVirtuals();
        this.setMethods();

        // this.DBModule.models[this.name] = this.DBModule.DB.model(this.name, this.schema);
    }

    protected abstract setVirtuals(): void;
    protected abstract setMethods(): void;

}
