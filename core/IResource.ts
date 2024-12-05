/**
 * @author afu
 * @license MIT
 */
import type HttpRequest from '../http/HttpRequest.ts';
import type IFilter from './IFilter.ts';

/**
 * Class implementing this interface is called a resource class
 */
export default interface IResource {
    /**
     * Declare resource filters
     */
    filters(): IFilter[] | null;

    /**
     * Run the resource
     */
    run(request: HttpRequest): Promise<Response>;
}
