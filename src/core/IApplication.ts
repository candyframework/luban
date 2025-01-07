/**
 * @author afu
 * @license MIT
 */
import type HttpRequest from '../http/HttpRequest.ts';
import type HttpResponse from '../http/HttpResponse.ts';
import type AbstractException from './AbstractException.ts';
import type AbstractExceptionHandler from './AbstractExceptionHandler.ts';

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
    exceptionHandler: typeof AbstractExceptionHandler | null;

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
     * @param {HttpRequest} request http request
     */
    requestListener(request: HttpRequest): Promise<HttpResponse>;

    /**
     * Handle exception
     *
     * @param {AbstractException} exception Exception instance
     */
    handlerException(exception: AbstractException): HttpResponse;
}
