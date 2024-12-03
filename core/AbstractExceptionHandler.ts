/**
 * @author afu
 * @license MIT
 */
import type IApplication from './IApplication.ts';
import type IException from './IException.ts';

/**
 * Exception handler
 */
export default abstract class AbstractExceptionHandler {
    public application: IApplication;

    constructor(application: IApplication) {
        this.application = application;
    }

    /**
     * Handle exception
     *
     * @param {IException} exception Exception instance
     */
    public abstract handlerException(exception: IException): Response;
}
