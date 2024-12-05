/**
 * @author afu
 * @license MIT
 */
import type HttpRequest from '../http/HttpRequest.ts';
import type IFilterChain from './IFilterChain.ts';

/**
 * Filter interface
 */
export default interface IFilter {
    /**
     * The filter method
     *
     * This method needs to call `filterChain.doFilter(request)` manually to execute the next filter
     */
    doFilter(req: HttpRequest, filterChain: IFilterChain): Promise<Response>;
}
