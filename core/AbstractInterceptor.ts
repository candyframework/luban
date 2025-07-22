import type HttpRequest from '../http/HttpRequest.ts';
import type HttpResponse from '../http/HttpResponse.ts';

/**
 * Interceptor
 */
export default abstract class AbstractInterceptor {
    /**
     * Intercept request
     */
    public abstract intercept(_request: HttpRequest): Promise<HttpResponse>;
}
