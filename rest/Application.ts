/**
 * @author afu
 * @license MIT
 */
import type IRestApplication from './IRestApplication.ts';
import type HttpRequest from '../http/HttpRequest.ts';
import type IException from '../core/IException.ts';
import AbstractApplication, { type ApplicationConfig } from '../core/AbstractApplication.ts';
import ExceptionHandler from './ExceptionHandler.ts';
import NotFoundException from '../core/NotFoundException.ts';
import Candy from '../Candy.ts';
import FastRouter, { type HandlerParameters, type Route } from './FastRouter.ts';

export type RestApplicationConfig = {
    /**
     * @link Application#exceptionHandler
     */
    exceptionHandler?: typeof ExceptionHandler;
    /**
     * @link Application#combineRoutes
     */
    combineRoutes?: boolean;
} & ApplicationConfig;

/**
 * Rest application
 */
export default class Application extends AbstractApplication implements IRestApplication {
    public override exceptionHandler: typeof ExceptionHandler = ExceptionHandler;

    /**
     * Class and method separator
     */
    // static separator: string = '@';

    /**
     * Methods
     *
     * Each method has the follow structure
     *
     * ```
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
     * Flag to indicate whether to combine routes
     */
    public combineRoutes: boolean = false;

    public cachedRouter: Map<string, FastRouter> = new Map();

    constructor(config: RestApplicationConfig) {
        super(config);

        Candy.configure(this, config);
    }

    /**
     * @inheritdoc
     */
    public override requestListener(request: HttpRequest): Promise<Response> {
        const route = new URL(request.request.url).pathname;
        const ret = this.resolveRoutes(route, request.getRequestMethod());

        if (null === ret) {
            throw new NotFoundException('The route requested is not found');
        }

        // handler is function
        // if('function' === typeof ret.handler) {
        return ret.handler(request, ret.parameters);
        // }

        // handler is string
        // const pos = ret.handler.indexOf(Application.separator);
        // let obj: any = null;

        // if(-1 === pos) {
        //     obj = await Candy.createObjectAsString(ret.handler);
        //     return obj.run(request, ret.parameters);

        // }

        // obj = Candy.createObjectAsString( ret.handler.substring(0, pos) );
        // return obj[ ret.handler.substring(pos + 1) ](request, ret.parameters);
    }

    /**
     * Parses the route and returns the handler
     *
     * @param {string} route Route path
     * @param {string} httpMethod Request method
     */
    private resolveRoutes(route: string, httpMethod: string): {
        handler: Route['handler'];
        parameters: HandlerParameters;
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
     * Adds a route to the collection
     *
     * @param {string} httpMethod
     * @param {string} route
     * @param {any} handler
     */
    public addRoute(httpMethod: string, route: string, handler: any): void {
        this.methods[httpMethod].push({
            route: route,
            handler: handler,
        });
    }

    /**
     * Adds routes to the collection
     *
     * @param {string[]} httpMethods
     * @param {string} route
     * @param {any} handler
     */
    public addRoutes(httpMethods: string[], route: string, handler: any): void {
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

    /**
     * @inheritdoc
     */
    public override handlerException(exception: IException): Response {
        const handler = new this.exceptionHandler(this);

        return handler.handlerException(exception);
    }
}
