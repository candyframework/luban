/**
 * @author afu
 * @license MIT
 */
import type IException from '../core/IException.ts';
import AbstractExceptionHandler from '../core/AbstractExceptionHandler.ts';
import HttpResponse from '../http/HttpResponse.ts';
import LuBan from '../LuBan.ts';

/**
 * Web exception handler
 */
export default class ExceptionHandler extends AbstractExceptionHandler {
    constructor() {
        super();
    }

    /**
     * @inheritdoc
     */
    public handlerException(exception: IException): HttpResponse {
        const app = LuBan.application;
        const msg = app?.debug ? exception.message + '\n' + exception.stack : 'The server encountered an internal error';

        return HttpResponse.fromText(msg);
    }
}
