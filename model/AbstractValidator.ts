/**
 * @author afu
 * @license MIT
 */
import type IValidator from './IValidator.ts';

/**
 * Validator base class
 */
export default abstract class AbstractValidator implements IValidator {
    public attributes: string[] | null = null;
    public messages: string[] | null = null;
    public attributeValues: Record<string, any> | null = null;

    /**
     * Skip validation of remaining attributes
     */
    public skip: boolean = false;

    constructor() {}

    /**
     * Get error message for an attribute
     *
     * @param {string} attributeName Attribute name
     * @return {string} Return error message if validation fails, otherwise return an empty string
     */
    public getMessage(attributeName: string): string {
        if (null === this.attributes || null === this.messages) {
            return '';
        }

        const index = this.attributes.indexOf(attributeName);
        if (-1 === index || this.messages.length <= index) {
            return '';
        }

        return this.messages[index];
    }

    /**
     * Entry to validate all assigned attributes
     *
     * @return {string[]}
     */
    public validateAttributes(): string[] {
        const list = this.attributes;
        const values = this.attributeValues;
        const infos: string[] = [];

        if (null === list || null === values) {
            return infos;
        }

        for (let i = 0, result = ''; i < list.length; i++) {
            if (this.skip) {
                break;
            }

            result = this.validate(list[i], values[list[i]]);

            if ('' !== result) {
                infos.push(result);
            }
        }

        return infos;
    }

    /**
     * @inheritdoc
     */
    public abstract validate(attributeName: string, attributeValue: any): string;
}
