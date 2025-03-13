/**
 * @author afu
 * @license MIT
 */
import type HttpRequest from '../http/HttpRequest.ts';
import type HttpResponse from '../http/HttpResponse.ts';
import type AbstractExceptionHandler from './AbstractExceptionHandler.ts';
import type AbstractInterceptor from './AbstractInterceptor.ts';
import type IException from './IException.ts';

/**
 * Application interface
 */
export default interface IApplication {
    /**
     * Application id
     */
    id: string;

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
     *
     * ```typescript
     * import MyErrorHandler from 'somepath/MyErrorHandler.ts';
     *
     * new Application({
     *      exceptionHandler: new MyErrorHandler()
     * });
     * ```
     */
    exceptionHandler: AbstractExceptionHandler | null;

    /**
     * Interceptor class
     *
     * ```typescript
     * import MyInterceptor from 'somepath/MyInterceptor.ts';
     *
     * new Application({
     *      interceptor: new MyInterceptor()
     * });
     * ```
     */
    interceptor: AbstractInterceptor | null;

    /**
     * The path of the application
     */
    appPath?: string;

    /**
     * The path of runtime cache files
     */
    runtimePath?: string;

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
     * @param {IException} exception Exception instance
     */
    handlerException(exception: IException): HttpResponse;
}
