/**
 * @author afu
 * @license MIT
 */
import type IFilter from '../core/IFilter.ts';
import type IResource from '../core/IResource.ts';
import type HttpRequest from '../http/HttpRequest.ts';
import type Application from './Application.ts';

/**
 * Interceptor
 */
export default class Interceptor implements IResource {
    protected application: Application;

    constructor(application: Application) {
        this.application = application;
    }

    public filters(): IFilter[] | null {
        throw new Error('Method not implemented.');
    }

    public run(_request: HttpRequest): Promise<Response> {
        return Promise.resolve(new Response('Currently temporarily out of service.'));
    }
}
