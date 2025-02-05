import type HttpRequest from '../http/HttpRequest.ts';
import type HttpResponse from '../http/HttpResponse.ts';
import type IResource from './IResource.ts';
import type { SubFilter } from './IFilter.ts';

/**
 * Interceptor
 */
export default abstract class AbstractInterceptor implements IResource {
    constructor() {}

    /**
     * @inheritdoc
     */
    public filters(): SubFilter[] | null {
        return null;
    }

    /**
     * @inheritdoc
     */
    public abstract run(_request: HttpRequest): Promise<HttpResponse>;
}
