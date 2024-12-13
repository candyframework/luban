/**
 * @author afu
 * @license MIT
 */

export type SubValidator = new () => IValidator;

/**
 * Validator interface
 */
export default interface IValidator {
    /**
     * Atrributes list to be validated
     *
     * ```
     * ['name', 'age']
     * ```
     */
    attributes: string[] | null;

    /**
     * The error messages list for each attribute
     *
     * ```
     * ['name is required', 'age is required']
     * ```
     */
    messages: string[] | null;

    /**
     * Atrributes values pass from model
     *
     * ```
     * {name: 'zs', age: 18}
     * ```
     */
    attributeValues: Record<string, any> | null;

    /**
     * Validate an attribute
     *
     * @param {string} attributeName Attribute name
     * @param {any} attributeValue Attribute value
     * @returns {string} Return error message if validation fails, otherwise return an empty string
     */
    validate(attributeName: string, attributeValue: any): string;
}
