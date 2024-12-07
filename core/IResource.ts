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
     *
     * ```
     * import Filter1 from 'somewhere.ts';
     * import Filter2 from 'somewhere2.ts';
     *
     * public filters() {
     *      return [
     *          Filter1,
     *          Filter2
     *      ];
     * }
     * ```
     */
    filters(): IFilter[] | null;

    /**
     * Run the resource
     */
    run(request: HttpRequest): Promise<Response>;
}
