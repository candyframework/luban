/**
 * @author afu
 * @license MIT
 */

/**
 * Controller action event
 */
export default class ActionEvent {
    /**
     * http request
     */
    public request: Request | null = null;

    /**
     * Data
     */
    public data: string = '';

    /**
     * A flag used to determine whether to stop the request
     */
    public valid: boolean = true;
}
