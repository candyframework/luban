/**
 * @author afu
 * @license MIT
 */
import AbstractValidator from '../AbstractValidator.ts';

/**
 * Validator for string
 *
 * ```typescript
 * class XxxModel extends Model {
 *      rules() {
 *          return [
 *              {
 *                  validator: {
 *                      classType: StringValidator,
 *                      minLength: 1,
 *                      maxLength: 100,
 *                      trim: false
 *                  },
 *                  attributes: ['name'],
 *                  messages: ['The length of the name should be between 1 and 2333']
 *              }
 *          ];
 *      }
 * }
 * ```
 */
export default class StringValidator extends AbstractValidator {
    /**
     * Trim the string
     */
    public trim: boolean = false;

    /**
     * Minimum length
     */
    public minLength: number = 1;

    /**
     * maximum length
     */
    public maxLength: number = 2333;

    constructor() {
        super();
    }

    /**
     * @inheritdoc
     */
    public validate(attributeName: string, attributeValue: any): string {
        const info = this.getMessage(attributeName);

        if (undefined === attributeValue) {
            attributeValue = '';
        }

        if ('' !== attributeValue && this.trim) {
            attributeValue = attributeValue.trim();
        }

        if (attributeValue.length < this.minLength || attributeValue.length > this.maxLength) {
            return '' === info ? 'Length of the ' + attributeName + ' should be between ' + this.minLength + ' and ' + this.maxLength : info;
        }

        return '';
    }
}
