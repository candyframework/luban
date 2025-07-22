/**
 * @author afu
 * @license MIT
 */
import type IRestApplication from './IRestApplication.ts';
import type HttpRequest from '../http/HttpRequest.ts';
import type HttpResponse from '../http/HttpResponse.ts';
import type IException from '../core/IException.ts';
import type Interceptor from '../web/Interceptor.ts';
import type { FilterProperties } from '../core/Types.ts';
import FastRouter, { type Route, type RouteParameters } from './FastRouter.ts';
import AbstractApplication from '../core/AbstractApplication.ts';
import ExceptionHandler from '../web/ExceptionHandler.ts';
import NotFoundException from '../core/NotFoundException.ts';
import LuBan from '../LuBan.ts';

/**
 * Rest application
 */
export default class Application extends AbstractApplication implements IRestApplication {
    /**
     * @inheritdoc
     */
    public override exceptionHandler: ExceptionHandler | null = null;

    /**
     * @inheritdoc
     */
    public override interceptor: Interceptor | null = null;

    /**
     * Methods
     *
     * Each method has the follow structure
     *
     * ```typescript
     * [
     *      { route: route1, handler: callbackFunction1 },
     *      { route: route2, handler: callbackFunction2 }
     * ]
     * ```
     */
    public methods: Record<string, Route[]> = {
        GET: [],
        POST: [],
        PUT: [],
        DELETE: [],
        PATCH: [],
        HEAD: [],
        OPTIONS: [],
    };

    /**
     * @inheritdoc
     */
    public combineRoutes: boolean = false;

    public cachedRouter: Map<string, FastRouter> = new Map();

    constructor(config: Partial<FilterProperties<IRestApplication>>) {
        super(config);

        LuBan.configure(this, config);
    }

    /**
     * @inheritdoc
     */
    public override requestListener(request: HttpRequest): Promise<HttpResponse> {
        if (null !== this.interceptor) {
            return this.interceptor.intercept(request);
        }

        const route = new URL(request.request.url).pathname;
        const ret = this.resolveRoutes(route, request.getRequestMethod());

        if (null === ret) {
            throw new NotFoundException('The route requested is not found.');
        }

        return ret.handler(request, ret.parameters);
    }

    /**
     * @inheritdoc
     */
    public override handlerException(exception: IException): HttpResponse {
        if (null === this.exceptionHandler) {
            return new ExceptionHandler().handlerException(exception);
        }

        return this.exceptionHandler.handlerException(exception);
    }

    /**
     * Parses the route and returns the handler
     *
     * @param {string} route Route path
     * @param {string} httpMethod Request method
     */
    private resolveRoutes(route: string, httpMethod: string): {
        handler: Route['handler'];
        parameters: RouteParameters;
    } | null {
        const routesMap = this.methods[httpMethod];
        if (0 === routesMap.length) {
            return null;
        }

        const fr = this.cachedRouter.get(httpMethod);

        if (undefined !== fr) {
            return this.combineRoutes ? fr.exec(route) : fr.execInOrder(route);
        }

        const fastRouter = new FastRouter();
        fastRouter.setRoutes(routesMap);
        this.cachedRouter.set(httpMethod, fastRouter);

        return this.combineRoutes ? fastRouter.exec(route) : fastRouter.execInOrder(route);
    }

    /**
     * Add a route
     *
     * @param {string} httpMethod
     * @param {string} route
     * @param {Route['handler']} handler
     */
    public addRoute(httpMethod: string, route: string, handler: Route['handler']): void {
        this.methods[httpMethod].push({
            route: route,
            handler: handler,
        });
    }

    /**
     * Add a route to multiple methods
     *
     * @param {string[]} httpMethods
     * @param {string} route
     * @param {Route['handler']} handler
     */
    public addRoutes(httpMethods: string[], route: string, handler: Route['handler']): void {
        for (let i = 0, len = httpMethods.length; i < len; i++) {
            this.methods[httpMethods[i]].push({
                route: route,
                handler: handler,
            });
        }
    }

    /**
     * @inheritdoc
     */
    public get(route: string, handler: Route['handler']): void {
        this.addRoute('GET', route, handler);
    }

    /**
     * @inheritdoc
     */
    public post(route: string, handler: Route['handler']): void {
        this.addRoute('POST', route, handler);
    }

    /**
     * @inheritdoc
     */
    public put(route: string, handler: Route['handler']): void {
        this.addRoute('PUT', route, handler);
    }

    /**
     * @inheritdoc
     */
    public delete(route: string, handler: Route['handler']): void {
        this.addRoute('DELETE', route, handler);
    }

    /**
     * @inheritdoc
     */
    public patch(route: string, handler: Route['handler']): void {
        this.addRoute('PATCH', route, handler);
    }

    /**
     * @inheritdoc
     */
    public head(route: string, handler: Route['handler']): void {
        this.addRoute('HEAD', route, handler);
    }

    /**
     * @inheritdoc
     */
    public options(route: string, handler: Route['handler']): void {
        this.addRoute('OPTIONS', route, handler);
    }
}
