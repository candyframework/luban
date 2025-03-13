/**
 * @author afu
 * @license MIT
 */
import type HttpRequest from '../http/HttpRequest.ts';
import type HttpResponse from '../http/HttpResponse.ts';
import type IException from '../core/IException.ts';
import type Interceptor from './Interceptor.ts';
import type IResource from '../core/IResource.ts';
import type IWebApplication from './IWebApplication.ts';
import type View from './View.ts';
import type { FilterProperties } from '../core/Types.ts';
import AbstractApplication from '../core/AbstractApplication.ts';
import ExceptionHandler from './ExceptionHandler.ts';
import StringHelper from '../helpers/StringHelper.ts';
import NotFoundException from '../core/NotFoundException.ts';
import Candy from '../Candy.ts';
import Controller from './Controller.ts';

/**
 * Web application
 */
export default class Application extends AbstractApplication implements IWebApplication {
    /**
     * @inheritdoc
     */
    public override exceptionHandler: ExceptionHandler | null = null;

    /**
     * @inheritdoc
     */
    public override interceptor: Interceptor | null = null;

    /**
     * @inheritdoc
     */
    public routesMap: Record<string, string> | null = null;

    /**
     * @inheritdoc
     */
    public modules: Record<string, string> | null = null;

    /**
     * @inheritdoc
     */
    public defaultView: View | null = null;

    /**
     * @inheritdoc
     */
    public defaultControllerNamespace = 'app/controllers';

    /**
     * @inheritdoc
     */
    public defaultRoute = 'index/index';

    /**
     * @inheritdoc
     */
    public defaultControllerId = 'index';

    constructor(config: Partial<FilterProperties<IWebApplication>>) {
        super(config);

        Candy.configure(this, config);
    }

    /**
     * @inheritdoc
     */
    public override async requestListener(request: HttpRequest): Promise<HttpResponse> {
        if (null !== this.interceptor) {
            return this.interceptor.intercept(request);
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
        if (null === this.exceptionHandler) {
            return new ExceptionHandler().handlerException(exception);
        }

        return this.exceptionHandler.handlerException(exception);
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
