/**
 * @author afu
 * @license MIT
 */
import type IValidator from './IValidator.ts';
import type { SubValidator } from './IValidator.ts';

export type Rule = {
    validator: { classType: SubValidator; [key: string]: any };
    attributes: string[];
    messages: string[];
};

/**
 * Model interface
 */
export default interface IModel {
    /**
     * The model name
     */
    modelName: string;

    /**
     * The model attributes and their default values. And The values of these attributes will be overwritten later
     *
     * ```
     * {name: 'zs', age: 18}
     * ```
     */
    attributes: Record<string, any> | null;

    /**
     * The model attributes map to form fields
     *
     * ```
     * {name: 'user_name'}
     * ```
     */
    attributesMap: Record<string, string> | null;

    /**
     * Error messages
     */
    errors: string[];

    /**
     * Returns the validation rules for attributes
     *
     * ```
     * [
     *      {
     *          validator: RequiredValidator,
     *          attributes: ['name', 'age'],
     *          messages: ['name is required', 'age is required']
     *      }
     * ]
     * ```
     */
    rules(): Rule[] | null;

    /**
     * Get all attributes
     *
     * @returns {Record<string, any>}
     */
    getAttributes(): Record<string, any> | null;

    /**
     * Get an attribute
     *
     * @param {string} name Attribute name
     */
    getAttribute(name: string): any;

    /**
     * Set attributes. And it will replace all default attributes
     *
     * @param {Record<string, any>} attributes Attributes to be set
     */
    setAttributes(attributes: Record<string, any>): void;

    /**
     * Set an attribute. And the attribute with the same name will be overwritten
     *
     * @param {string} name Attribute name
     * @param {any} value Attribute value
     */
    setAttribute(name: string, value: any): void;

    /**
     * Get validators
     *
     * @returns {IValidator[] | null}
     */
    getValidators(): IValidator[] | null;

    /**
     * Run validation
     *
     * @returns {boolean}
     */
    validate(): boolean;

    /**
     * Get all errors
     *
     * @returns {string[]}
     */
    getErrors(): string[];

    /**
     * Get the first error
     *
     * @returns {string}
     */
    getFirstError(): string;

    /**
     * Clear all errors
     */
    clearErrors(): void;

    /**
     * Fill the model with form data from the request
     */
    loadFromFormData(request: Request): Promise<boolean>;

    /**
     * Fill the model with json data from the request
     */
    loadFromJson(request: Request): Promise<boolean>;
}
