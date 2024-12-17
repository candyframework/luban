/**
 * @author afu
 * @license MIT
 */
import type IApplication from '../core/IApplication.ts';
import type { Route } from './FastRouter.ts';

/**
 * Rest application interface
 */
export default interface IRestApplication extends IApplication {
    /**
     * Get request
     */
    get(route: string, handler: Route['handler']): void;

    /**
     * Post request
     */
    post(route: string, handler: Route['handler']): void;

    /**
     * Put request
     */
    put(route: string, handler: Route['handler']): void;

    /**
     * Delete request
     */
    delete(route: string, handler: Route['handler']): void;

    /**
     * Patch request
     */
    patch(route: string, handler: Route['handler']): void;

    /**
     * Head request
     */
    head(route: string, handler: Route['handler']): void;

    /**
     * Options request
     */
    options(route: string, handler: Route['handler']): void;
}
