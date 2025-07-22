/**
 * @author afu
 * @license MIT
 */

/**
 * server request
 */
export default abstract class AbstractRequest {
    /**
     * Native request object
     */
    public request: Request;

    constructor(request: Request) {
        this.request = request;
    }

    /**
     * Get the entry script file path
     *
     * @returns {string}
     */
    public getScriptFile(): string {
        return '';
    }
}
