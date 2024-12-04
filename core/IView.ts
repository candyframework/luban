/**
 * View interface
 */
export default interface IView {
    /**
     * Render the view
     *
     * @param {string} view The view path
     * @param {any} parameters The parameters pass to view
     */
    render(view: string, parameters: any): Promise<string>;
}
