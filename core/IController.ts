/**
 * @author afu
 * @license MIT
 */
import type IResource from './IResource.ts';
import type ActionEvent from './ActionEvent.ts';

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
     * Render a view
     *
     * @param {string} view View name or path
     * @param {unknown} parameters Parameters to be passed to the view
     */
    render(view: string, parameters?: unknown): Promise<string>;
}
