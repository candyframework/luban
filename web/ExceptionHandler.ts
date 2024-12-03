/**
 * @author afu
 * @license MIT
 */
import type Application from './Application.ts';
import type IException from '../core/IException.ts';
import AbstractExceptionHandler from '../core/AbstractExceptionHandler.ts';

/**
 * Web exception handler
 */
export default class ExceptionHandler extends AbstractExceptionHandler {
    constructor(application: Application) {
        super(application);
    }

    /**
     * @inheritdoc
     */
    public handlerException(exception: IException): Response {
        const app = this.application;
        const msg = app.debug ? exception.message : 'The server encountered an internal error';

        const response = new Response(msg, {
            'status': 500,
            'headers': {
                'Content-Type': 'text/plain',
            },
        });

        return response;
    }
}
