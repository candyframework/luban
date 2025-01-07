/**
 * @author afu
 * @license MIT
 */
import type Application from './Application.ts';
import type AbstractException from '../core/AbstractException.ts';
import AbstractExceptionHandler from '../core/AbstractExceptionHandler.ts';
import HttpResponse from '../http/HttpResponse.ts';

/**
 * Rest exception handler
 */
export default class ExceptionHandler extends AbstractExceptionHandler {
    constructor(application: Application) {
        super(application);
    }

    /**
     * @inheritdoc
     */
    public handlerException(exception: AbstractException): HttpResponse {
        const app = this.application;
        const msg = app.debug ? exception.message + '\n' + exception.stack : 'The server encountered an internal error';

        return HttpResponse.fromText(msg);
    }
}
