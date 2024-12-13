/**
 * @author afu
 * @license MIT
 */
import AbstractValidator from '../AbstractValidator.ts';
import ValidatorException from '../../core/ValidatorException.ts';

/**
 * Check if the multiple attributes are equal
 *
 * ```
 * class XxxModel extends Model {
 *      rules() {
 *          return [
 *              {
 *                  validator: {
 *                      classType: EqualValidator
 *                  }.
 *                  attributes: ['password', 'confirming'],
 *                  messages: ['The passwords entered twice are inconsistent']
 *              }
 *          ];
 *      }
 * }
 * ```
 */
export default class EqualValidator extends AbstractValidator {
    /**
     * @inheritdoc
     */
    public validate(attributeName: string, attributeValue: any): string {
        if (null === this.attributes || null === this.attributeValues) {
            throw new ValidatorException('Attributes property must be set.');
        }

        let hasError = false;
        const firstValue = attributeValue;
        const info = this.getMessage(attributeName);

        this.skip = true;

        for (let i = 1; i < this.attributes.length; i++) {
            if (firstValue !== this.attributeValues[this.attributes[i]]) {
                hasError = true;
                break;
            }
        }

        if (hasError) {
            return '' === info ? this.attributes.toString() + ' are not equal' : info;
        }

        return '';
    }
}
