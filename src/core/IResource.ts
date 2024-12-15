/**
 * @author afu
 * @license MIT
 */
import type HttpRequest from '../http/HttpRequest.ts';
import type IFilter from './IFilter.ts';

/**
 * Class implementing this interface is a resource class
 */
export default interface IResource {
    /**
     * Declare resource filters
     *
     * ```typescript
     * import Filter1 from 'somewhere.ts';
     * import Filter2 from 'somewhere2.ts';
     *
     * export default class MyResource implements IResource {
     *      public filters() {
     *          return [
     *              Filter1,
     *              Filter2
     *          ];
     *      }
     * }
     * ```
     */
    filters(): IFilter[] | null;

    /**
     * Run the resource
     */
    run(request: HttpRequest): Promise<Response>;
}
