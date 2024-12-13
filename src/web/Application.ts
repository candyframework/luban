/**
 * @author afu
 * @license MIT
 */
import type IException from '../core/IException.ts';
import type HttpRequest from '../http/HttpRequest.ts';
import type Interceptor from './Interceptor.ts';
import type IResource from '../core/IResource.ts';
import AbstractApplication, { type ApplicationConfig } from '../core/AbstractApplication.ts';
import ExceptionHandler from './ExceptionHandler.ts';
import StringHelper from '../helpers/StringHelper.ts';
import NotFoundException from '../core/NotFoundException.ts';
import Candy from '../Candy.ts';
import Controller from './Controller.ts';
import View from './View.ts';

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
     */
    public interceptor: typeof Interceptor | null = null;

    /**
     * Routes map
     */
    public routesMap: Record<string, string> | null = null;

    /**
     * Modules
     */
    public modules: Record<string, string> | null = null;

    /**
     * Default view class
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
    public override async requestListener(request: HttpRequest): Promise<Response> {
        const route = new URL(request.request.url).pathname;
        const controller = await this.createController(route);

        if (null === controller) {
            throw new NotFoundException('The route requested is not found.');
        }

        // 是否继承自框架控制器
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
    public override handlerException(exception: IException): Response {
        const handler = new this.exceptionHandler(this);

        return handler.handlerException(exception);
    }

    private createController(route: string): Promise<IResource | null> {
        let moduleId = '';
        let controllerId = '';
        let viewPath = '';

        route = StringHelper.lTrimChar(route, '/');

        if ('' === route || '/' === route) {
            route = this.defaultRoute;
        }

        if (route.indexOf('//') >= 0) {
            return Promise.resolve(null);
        }

        // 拦截路由
        if (null !== this.interceptor) {
            return Promise.resolve(new this.interceptor(this));
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
            '/' +
            viewPath +
            '/' +
            StringHelper.ucFirst(controllerId) + 'Controller';

        return Candy.createObjectAsString(clazz, {
            application: this,
            moduleId: moduleId,
            controllerId: controllerId,
            viewPath: viewPath,
        });
    }
}
