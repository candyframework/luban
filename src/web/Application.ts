/**
 * @author afu
 * @license MIT
 */
import type HttpRequest from '../http/HttpRequest.ts';
import type HttpResponse from '../http/HttpResponse.ts';
import type IException from '../core/IException.ts';
import type Interceptor from './Interceptor.ts';
import type IResource from '../core/IResource.ts';
import AbstractApplication, { type ApplicationConfig } from '../core/AbstractApplication.ts';
import ExceptionHandler from './ExceptionHandler.ts';
import StringHelper from '../helpers/StringHelper.ts';
import NotFoundException from '../core/NotFoundException.ts';
import Candy from '../Candy.ts';
import Controller from './Controller.ts';
import View from './View.ts';

/**
 * Web application configuration
 */
export type WebApplicationConfig = {
    /**
     * @link Application#exceptionHandler
     */
    exceptionHandler?: typeof ExceptionHandler;
    /**
     * @link Application#interceptor
     */
    interceptor?: typeof Interceptor | null;
    /**
     * @link Application#routesMap
     */
    routesMap?: Record<string, string>;
    /**
     * @link Application#modules
     */
    modules?: Record<string, string>;
    /**
     * @link Application#defaultView
     */
    defaultView?: typeof View;
    /**
     * @link Application#defaultControllerNamespace
     */
    defaultControllerNamespace?: string;
    /**
     * @link Application#defaultRoute
     */
    defaultRoute?: string;
    /**
     * @link Application#defaultControllerId
     */
    defaultControllerId?: string;
} & ApplicationConfig;

/**
 * Web application
 */
export default class Application extends AbstractApplication {
    /**
     * @inheritdoc
     */
    public override exceptionHandler: typeof ExceptionHandler = ExceptionHandler;

    /**
     * Interceptor class
     *
     * ```typescript
     * import MyInterceptor from 'somepath/MyInterceptor.ts';
     *
     * new Application({
     *      interceptor: MyInterceptor
     * });
     * ```
     */
    public interceptor: typeof Interceptor | null = null;

    /**
     * Custom routes map
     *
     * ```typescript
     * new Application({
     *      routesMap: {
     *          user: 'app/controllers/user/UserController'
     *      }
     * });
     * ```
     */
    public routesMap: Record<string, string> | null = null;

    /**
     * Register modules and their paths
     *
     * ```typescript
     * new Application({
     *      modules: {
     *          'yearactivity': 'app/modules/newyearactivity'
     *      }
     * });
     * ```
     */
    public modules: Record<string, string> | null = null;

    /**
     * Default view class
     *
     * ```typescript
     * import MyView from 'somepath/MyView.ts';
     *
     * new Application({
     *      defaultView: MyView
     * });
     * ```
     */
    public defaultView: typeof View = View;

    /**
     * Default controller directory
     */
    public defaultControllerNamespace = 'app/controllers';

    /**
     * Default route
     */
    public defaultRoute = 'index/index';

    /**
     * Default controller id
     */
    public defaultControllerId = 'index';

    constructor(config: WebApplicationConfig) {
        super(config);

        Candy.configure(this, config);
    }

    /**
     * @inheritdoc
     */
    public override async requestListener(request: HttpRequest): Promise<HttpResponse> {
        if (null !== this.interceptor) {
            return new this.interceptor(this).run(request);
        }

        const route = new URL(request.request.url).pathname;
        if (route.includes('//')) {
            throw new NotFoundException('The route requested is not found.');
        }

        const controller = await this.createController(route);
        if (!(controller instanceof Controller)) {
            return controller.run(request);
            // return Reflect.apply(controller['run'], controller, [request]);
        }

        controller.context.request = request;
        return controller.runControllerAction(request);
    }

    /**
     * @inheritdoc
     */
    public override handlerException(exception: IException): HttpResponse {
        const handler = new this.exceptionHandler(this);

        return handler.handlerException(exception);
    }

    private createController(route: string): Promise<IResource> {
        let moduleId = '';
        let controllerId = '';
        let viewPath = '';

        route = StringHelper.lTrimChar(route, '/');
        if ('' === route || '/' === route) {
            route = this.defaultRoute;
        }

        let id = '';
        let pos = route.indexOf('/');
        if (-1 !== pos) {
            id = route.substring(0, pos);
            route = route.substring(pos + 1);
            controllerId = route;
        } else {
            id = route;
            route = '';
        }

        viewPath = id;

        if (-1 !== (pos = route.lastIndexOf('/'))) {
            viewPath = viewPath + '/' + route.substring(0, pos);
            controllerId = route.substring(pos + 1);
        }
        if ('' === controllerId) {
            controllerId = this.defaultControllerId;
        }

        // search order: routesMap, module, commonController
        let clazz = '';
        if (null !== this.routesMap && undefined !== this.routesMap[id]) {
            return Candy.createObjectAsString(this.routesMap[id], {
                application: this,
                moduleId: moduleId,
                controllerId: controllerId,
                viewPath: viewPath,
            });
        }

        if (null !== this.modules && undefined !== this.modules[id]) {
            moduleId = id;
            clazz = StringHelper.trimChar(this.modules[id], '/') +
                '/controllers/' +
                StringHelper.ucFirst(controllerId) + 'Controller';

            return Candy.createObjectAsString(clazz, {
                application: this,
                moduleId: moduleId,
                controllerId: controllerId,
                viewPath: viewPath,
            });
        }

        clazz = this.defaultControllerNamespace +
            '/' + viewPath + '/' +
            StringHelper.ucFirst(controllerId) + 'Controller';

        return Candy.createObjectAsString(clazz, {
            application: this,
            moduleId: moduleId,
            controllerId: controllerId,
            viewPath: viewPath,
        });
    }
}
