/**
 * @author afu
 * @license MIT
 */
import type HttpRequest from '../http/HttpRequest.ts';

/**
 * Filter chain interface
 */
export default interface IFilterChain {
    /**
     * Invoked the next filter or the resource
     */
    doFilter(req: HttpRequest): Promise<Response>;
}
