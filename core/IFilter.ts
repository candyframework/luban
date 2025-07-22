/**
 * @author afu
 * @license MIT
 */
import type HttpRequest from '../http/HttpRequest.ts';
import type HttpResponse from '../http/HttpResponse.ts';
import type IFilterChain from './IFilterChain.ts';

/**
 * Implement class of IFilter
 */
export type SubFilter = new () => IFilter;

/**
 * Filter interface
 *
 * The class that implements the `doFilter` method considers to be a filter
 */
export default interface IFilter {
    /**
     * The filter method
     *
     * This method needs to call `filterChain.doFilter(request)` manually to execute the next filter
     */
    doFilter(req: HttpRequest, filterChain: IFilterChain): Promise<HttpResponse>;
}
