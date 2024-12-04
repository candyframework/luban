/**
 * @author afu
 * @license MIT
 */
import type HttpRequest from '../http/HttpRequest.ts';

/**
 * Class implementing this interface is called a resource class
 */
export default interface IResource {
    /**
     * Declare resource filters
     */
    filters(): string[] | null;

    /**
     * Run the resource
     */
    run(request: HttpRequest): Promise<Response>;
}
