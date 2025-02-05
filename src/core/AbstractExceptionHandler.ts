/**
 * @author afu
 * @license MIT
 */
import type HttpResponse from '../http/HttpResponse.ts';
import type IException from './IException.ts';

/**
 * Exception handler
 */
export default abstract class AbstractExceptionHandler {
    constructor() {}

    /**
     * Handle exception
     *
     * @param {IException} exception Exception instance
     */
    public abstract handlerException(exception: IException): HttpResponse;
}
