/**
 * @author afu
 * @license MIT
 */

/**
 * server request
 */
export default abstract class AbstractRequest {
    public request: Request;
    private scriptFile: string = '';

    constructor(request: Request) {
        this.request = request;
    }

    /**
     * Get the absolute path of the current module
     *
     * @return {string}
     */
    public getScriptFile(): string {
        if ('' === this.scriptFile) {
            this.scriptFile = import.meta.filename ?? '';
        }

        return this.scriptFile;
    }
}
