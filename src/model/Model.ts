/**
 * @author afu
 * @license MIT
 */
import type IModel from './IModel.ts';
import type { Rule } from './IModel.ts';
import type AbstractValidator from './AbstractValidator.ts';
import Event from '../core/Event.ts';
import ModelException from '../core/ModelException.ts';
import Candy from '../Candy.ts';

/**
 * The base model class
 */
export default class Model extends Event implements IModel {
    public modelName: string = '';
    public attributes: Record<string, any> | null = null;
    public attributesMap: Record<string, string> | null = null;
    public errors: string[] = [];

    constructor() {
        super();
    }

    /**
     * @inheritdoc
     */
    public rules(): Rule[] | null {
        return null;
    }

    /**
     * @inheritdoc
     */
    public getAttributes(): Record<string, any> | null {
        return this.attributes;
    }

    /**
     * @inheritdoc
     */
    public getAttribute(name: string): any {
        if (null === this.attributes) {
            throw new ModelException('The model has no attribute to get.');
        }

        return this.attributes[name];
    }

    /**
     * @inheritdoc
     */
    public setAttributes(attributes: Record<string, any>): void {
        this.attributes = attributes;
    }

    /**
     * @inheritdoc
     */
    public setAttribute(name: string, value: any): void {
        if (null === this.attributes) {
            this.attributes = {};
        }

        this.attributes[name] = value;
    }

    /**
     * @inheritdoc
     */
    public getValidators(): AbstractValidator[] | null {
        const rules = this.rules();
        if (null === rules) {
            return null;
        }

        const ret = [];
        for (let i = 0; i < rules.length; i++) {
            const instance = Candy.createObject(rules[i].validator) as AbstractValidator;
            instance.attributes = rules[i].attributes;
            // messages is optional
            instance.messages = undefined === rules[i].messages ? null : rules[i].messages;
            instance.attributeValues = this.attributes;

            ret.push(instance);
        }

        return ret;
    }

    /**
     * @inheritdoc
     */
    public validate(): boolean {
        if (null === this.attributes) {
            throw new ModelException('The model has no attributes to validate.');
        }

        if (!this.beforeValidate()) {
            return false;
        }

        let validators = this.getValidators();
        if (null === validators) {
            return true;
        }

        for (const validator of validators) {
            this.errors = this.errors.concat(validator.validateAttributes());
        }

        this.afterValidate();
        validators = null;

        return this.errors.length === 0;
    }

    /**
     * Before validation
     */
    public beforeValidate(): boolean {
        return true;
    }

    /**
     * After validation
     */
    public afterValidate(): void {}

    /**
     * @inheritdoc
     */
    public getErrors(): string[] {
        return this.errors;
    }

    /**
     * @inheritdoc
     */
    public getFirstError(): string {
        if (this.errors.length > 0) {
            return this.errors[0];
        }

        return '';
    }

    /**
     * @inheritdoc
     */
    public clearErrors(): void {
        this.errors = [];
    }

    /**
     * @inheritdoc
     */
    public async loadFromFormData(request: Request): Promise<boolean> {
        if (null === this.attributes) {
            throw new ModelException('The model has no attributes.');
        }

        const form = await request.formData();
        const fields = Object.getOwnPropertyNames(this.attributes);

        let value: FormDataEntryValue | null;
        for (const field of fields) {
            if (null !== this.attributesMap && undefined !== this.attributesMap[field]) {
                value = form.get(this.attributesMap[field]);
            } else {
                value = form.get(field);
            }

            this.attributes[field] = value;
        }

        return true;
    }

    /**
     * @inheritdoc
     */
    public async loadFromJson(request: Request): Promise<boolean> {
        if (null === this.attributes) {
            throw new ModelException('The model has no attributes.');
        }

        const json = await request.json();
        const fields = Object.getOwnPropertyNames(this.attributes);

        let value: unknown;
        for (const field of fields) {
            if (null !== this.attributesMap && undefined !== this.attributesMap[field]) {
                value = json[this.attributesMap[field]];
            } else {
                value = json[field];
            }

            this.attributes[field] = value;
        }

        return true;
    }
}
