/**
 * @author afu
 * @license MIT
 */
import type IResource from '../core/IResource.ts';
import type HttpRequest from '../http/HttpRequest.ts';
import type Application from './Application.ts';
import type IFilter from '../core/IFilter.ts';
import HttpResponse from '../http/HttpResponse.ts';

/**
 * Interceptor
 */
export default class Interceptor implements IResource {
    protected application: Application;

    constructor(application: Application) {
        this.application = application;
    }

    /**
     * @inheritdoc
     */
    public filters(): IFilter[] | null {
        return null;
    }

    /**
     * @inheritdoc
     */
    public run(_request: HttpRequest): Promise<HttpResponse> {
        return Promise.resolve(HttpResponse.fromText('The system is under maintenance.'));
    }
}
