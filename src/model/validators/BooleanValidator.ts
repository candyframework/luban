/**
 * @author afu
 * @license MIT
 */
import AbstractValidator from '../AbstractValidator.ts';

/**
 * Check if the attribute value is a boolean value
 *
 * ```typescript
 * class XxxModel extends Model {
 *      rules() {
 *          return [
 *              {
 *                  validator: {
 *                      classType: BooleanValidator,
 *                      strict: true
 *                  },
 *                  attributes: ['open'],
 *                  messages: ['The open property must be true or false']
 *              }
 *          ];
 *      }
 * }
 * ```
 */
export default class BooleanValidator extends AbstractValidator {
    /**
     * Whether to check the type strictly
     */
    public strict: boolean = true;

    constructor() {
        super();
    }

    /**
     * @inheritdoc
     */
    public validate(attributeName: string, attributeValue: any): string {
        let valid = false;
        const info = this.getMessage(attributeName);

        if (this.strict) {
            valid = true === attributeValue || false === attributeValue;
        } else {
            valid = true == attributeValue || false == attributeValue;
        }

        if (!valid) {
            return '' === info ? attributeName + ' is invalid' : info;
        }

        return '';
    }
}
