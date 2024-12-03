/**
 * @author afu
 * @license MIT
 */
import type IException from '../core/IException.ts';
import type ExceptionHandler from './ExceptionHandler.ts';
import AbstractApplication, { type ApplicationConfig } from '../core/AbstractApplication.ts';
import StringHelper from '../helpers/StringHelper.ts';
import NotFoundException from '../core/NotFoundException.ts';
import Candy from '../Candy.ts';
import Controller from './Controller.ts';

export type WebApplicationConfig = {
    /**
     * @link Application#exceptionHandler
     */
    exceptionHandler?: string;
    /**
     * @link Application#interceptor
     */
    interceptor?: string;
    /**
     * @link Application#routesMap
     */
    routesMap?: { [key: string]: string };
    /**
     * @link Application#modules
     */
    modules?: { [key: string]: string };
    /**
     * @link Application#defaultView
     */
    defaultView?: string;
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
     * Exception handler class
     */
    public override exceptionHandler: string = 'candy/web/ExceptionHandler';

    /**
     * Interceptor class
     */
    public interceptor: string = '';

    /**
     * Routes map
     */
    public routesMap: { [key: string]: string } | null = null;

    /**
     * Modules
     */
    public modules: { [key: string]: string } | null = null;

    /**
     * Default view class
     */
    public defaultView = 'candy/web/View';

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
    public override async requestListener(request: Request): Promise<Response> {
        const route = new URL(request.url).pathname;
        const controller = await this.createController(route);

        if (null === controller) {
            throw new NotFoundException('The route requested is not found');
        }

        // 是否继承自框架控制器
        if (!(controller instanceof Controller)) {
            return Reflect.apply(controller['run'], controller, [request]);
        }

        controller.context.request = request;
        return controller.runControllerAction(request);
    }

    /**
     * @inheritdoc
     */
    public override async handlerException(exception: IException): Promise<Response> {
        const handler: ExceptionHandler = await Candy.createObjectAsString(
            this.exceptionHandler,
            this,
        );

        return handler.handlerException(exception);
    }

    private createController(route: string): Promise<Controller | null> {
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
        if ('' !== this.interceptor) {
            return Candy.createObjectAsString(this.interceptor, this);
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
