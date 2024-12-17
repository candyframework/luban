/**
 * @author afu
 * @license MIT
 */
import type IResource from './IResource.ts';
import type ActionEvent from './ActionEvent.ts';
import type { JSONCompatible } from './Json.ts';

export default interface IController extends IResource {
    /**
     * Before action
     *
     * @param {ActionEvent} actionEvent
     */
    beforeAction(actionEvent: ActionEvent): void;

    /**
     * After action
     *
     * @param {ActionEvent} actionEvent
     */
    afterAction(actionEvent: ActionEvent): void;

    /**
     * A quick way to call view's render method
     */
    render<T>(view: string, parameters: JSONCompatible<T> | null): Promise<string>;
}
