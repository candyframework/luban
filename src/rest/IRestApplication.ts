/**
 * @author afu
 * @license MIT
 */
import type IApplication from '../core/IApplication.ts';

/**
 * Rest application interface
 */
export default interface IRestApplication extends IApplication {
    /**
     * Get request
     */
    get(route: string, handler: any): void;

    /**
     * Post request
     */
    post(route: string, handler: any): void;

    /**
     * Put request
     */
    put(route: string, handler: any): void;

    /**
     * Delete request
     */
    delete(route: string, handler: any): void;

    /**
     * Patch request
     */
    patch(route: string, handler: any): void;

    /**
     * Head request
     */
    head(route: string, handler: any): void;

    /**
     * Options request
     */
    options(route: string, handler: any): void;
}
