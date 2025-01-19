/**
 * Middleware
 */
export type Middleware = (request: Request, hook: Hook) => Promise<Response | null>;

/**
 * Hook
 *
 * If a middleware returns a `Response`, the program will stop running and send the response to the client.
 */
export default class Hook {
    /**
     * The hook collection
     */
    private static hooks: Middleware[] = [];

    /**
     * The current position of the hook
     */
    private index: number = 0;

    /**
     * Current request
     */
    private request: Request;

    constructor(req: Request) {
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

    /**
     * Run the middlewares
     */
    public async run(): Promise<Response | null> {
        if (0 === Hook.hooks.length) {
            return null;
        }

        const hook = Hook.hooks[this.index++];
        if (this.index >= Hook.hooks.length) {
            return await hook(this.request, this);
        }

        return await hook(this.request, this);
    }

    /**
     * Continue to run the next middleware
     */
    public next(): Promise<Response | null> {
        if (this.index >= Hook.hooks.length) {
            return Promise.resolve(null);
        }
        return this.run();
    }
}
