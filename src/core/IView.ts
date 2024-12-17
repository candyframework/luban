import type { JSONCompatible } from './Json.ts';

/**
 * View interface
 */
export default interface IView {
    /**
     * Render a view
     *
     * @param {string} view The view name or path
     * @param {any} parameters The parameters pass to view
     */
    render<T>(view: string, parameters: JSONCompatible<T> | null): Promise<string>;
}
