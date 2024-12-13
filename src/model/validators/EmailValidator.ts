/**
 * @author afu
 * @license MIT
 */
import AbstractValidator from '../AbstractValidator.ts';

/**
 * Check if the attribute value is a valid email address
 *
 * ```
 * class XxxModel extends Model {
 *      rules() {
 *          return [
 *              {
 *                  validator: {
 *                     classType: EmailValidator
 *                  },
 *                  attributes: ['email'],
 *                  messages: ['The user email is invalid']
 *              }
 *          ];
 *      }
 * }
 * ```
 */
export default class EmailValidator extends AbstractValidator {
    public pattern: RegExp = /^[a-zA-Z0-9_\.\-]+\@(?:[a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,8}$/;

    constructor() {
        super();
    }

    /**
     * @inheritdoc
     */
    public validate(attributeName: string, attributeValue: any): string {
        const info = this.getMessage(attributeName);

        if (!this.pattern.test(attributeValue)) {
            return '' === info ? attributeName + ' is invalid' : info;
        }

        return '';
    }
}
