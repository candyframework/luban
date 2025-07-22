import type HttpRequest from '../http/HttpRequest.ts';
import type IApplication from './IApplication.ts';

/**
 * Middleware
 */
export type Middleware = (request: Request, hook: Hook) => Promise<Response>;

/**
 * Hook
 */
export default class Hook {
    /**
     * The hook collection
     */
    public static hooks: Middleware[] = [];

    /**
     * The current position of the hook
     */
    private index: number;

    /**
     * Current application
     */
    private application: IApplication;

    /**
     * Current http request
     */
    private request: HttpRequest;

    constructor(app: IApplication, req: HttpRequest) {
        this.index = 0;
        this.application = app;
        this.request = req;
    }

    /**
     * Add a hook to the hook collection
     *
     * ```typescript
     * Hook.use(async (req: Request, hook: Hook) => {
     *      // do something
     *      return await hook.next();
     * });
     * ```
     */
    static use(middleware: Middleware): void {
        Hook.hooks.push(middleware);
    }

    private clear(): void {
        // @ts-ignore nocheck
        this.application = null;
        // @ts-ignore nocheck
        this.request = null;
    }

    /**
     * Run the middlewares
     */
    public async next(): Promise<Response> {
        if (this.index >= Hook.hooks.length) {
            const httpResponse = await this.application.requestListener(this.request);
            this.clear();
            return httpResponse.toResponse();
        }

        // As you can see, the Request object is used here instead of HttpRequest
        // This may be useful for compatibility with third-party middleware
        const hook = Hook.hooks[this.index++];
        return await hook(this.request.request, this);
    }
}
