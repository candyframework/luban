/**
 * @author afu
 * @license MIT
 */
import type IView from './IView.ts';

/**
 * Abstract view
 *
 * A template engine should extends this class and implement the `findView` and `renderFile` methods
 */
export default abstract class AbstractView implements IView {
    /**
     * Default extension of view file
     */
    public defaultExtension: string = '.html';

    /**
     * Render a view
     *
     * @param {string} view View name
     * @param {any} parameters The parameters pass to view
     */
    public render(view: string, parameters: any = null): Promise<string> {
        const file = this.findView(view);

        return this.renderFile(file, parameters);
    }

    /**
     * Find the view file path
     *
     * @param {string} view View name
     * @returns {string}
     */
    protected abstract findView(view: string): string;

    /**
     * Process a view file content
     *
     * @param {string} file View file path
     * @param {any} parameters
     */
    protected abstract renderFile(file: string, parameters: any): Promise<string>;
}
