/**
 * @author afu
 * @license MIT
 */
import type HttpRequest from '../http/HttpRequest.ts';

/**
 * Controller action event
 */
export default class ActionEvent {
    /**
     * Http request
     */
    public request: HttpRequest | null = null;

    /**
     * Data
     */
    public data: string = '';

    /**
     * A flag used to determine whether to stop the request
     */
    public valid: boolean = true;
}
