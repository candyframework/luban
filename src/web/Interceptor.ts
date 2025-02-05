/**
 * @author afu
 * @license MIT
 */
import type HttpRequest from '../http/HttpRequest.ts';
import AbstractInterceptor from '../core/AbstractInterceptor.ts';
import HttpResponse from '../http/HttpResponse.ts';

/**
 * Web Interceptor
 */
export default class Interceptor extends AbstractInterceptor {
    constructor() {
        super();
    }

    /**
     * @inheritdoc
     */
    public run(_request: HttpRequest): Promise<HttpResponse> {
        return Promise.resolve(HttpResponse.fromText('The system is under maintenance.'));
    }
}
