/**
 * @author afu
 * @license MIT
 */
import type HttpRequest from '../http/HttpRequest.ts';
import type HttpResponse from '../http/HttpResponse.ts';

/**
 * Controller action event
 */
export default class ActionEvent {
    /**
     * Http request
     */
    public request: HttpRequest | null = null;

    /**
     * Http response
     */
    public response: HttpResponse | null = null;

    /**
     * A flag used to determine whether to stop the request
     */
    public valid: boolean = true;
}
