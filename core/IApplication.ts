/**
 * @author afu
 * @license MIT
 */
import type IException from './IException.ts';

/**
 * Application interface
 */
export default interface IApplication {
    /**
     * Encoding
     */
    encoding: string;

    /**
     * Debug flag
     */
    debug: boolean;

    /**
     * Exception handler class
     */
    exceptionHandler: string;

    /**
     * Set application path
     *
     * @param {string} path Application path
     */
    setAppPath(path: string): void;

    /**
     * Get application path
     *
     * @returns {string} Application path
     */
    getAppPath(): string;

    /**
     * Set runtime path
     *
     * @param {string} path Runtime path
     */
    setRuntimePath(path: string): void;

    /**
     * Get runtime path
     *
     * @returns {string} Runtime path
     */
    getRuntimePath(): string;

    /**
     * Process http request
     *
     * @param {Request} request http request
     */
    requestListener(request: Request): Promise<Response>;

    /**
     * Handle exception
     *
     * @param {Request} exception Exception instance
     */
    handlerException(exception: IException): Promise<Response>;
}
