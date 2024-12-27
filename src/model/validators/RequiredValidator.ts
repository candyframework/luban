/**
 * @author afu
 * @license MIT
 */
import AbstractValidator from '../AbstractValidator.ts';

/**
 * Check if the attribute value is `''` or `undefined` or `null`
 *
 * ```typescript
 * class XxxModel extends Model {
 *      rules() {
 *          return [
 *              {
 *                  validator: {
 *                      classType: RequiredValidator
 *                  },
 *                  attributes: ['name', 'email'],
 *                  messages: ['Name is required', 'Email is required']
 *              }
 *          ];
 *      }
 * }
 * ```
 */
export default class RequiredValidator extends AbstractValidator {
    /**
     * @inheritdoc
     */
    public validate(attributeName: string, attributeValue: any): string {
        const info = this.getMessage(attributeName);

        if (undefined === attributeValue || '' === attributeValue || null === attributeValue) {
            return '' === info ? attributeName + ' is required' : info;
        }

        return '';
    }
}
