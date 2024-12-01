/**
 * @author afu
 * @license MIT
 */
import type IClass from '../core/IClass.ts';
import type IException from '../core/IException.ts';
import AbstractApplication from '../core/AbstractApplication.ts';
import StringHelper from '../helpers/StringHelper.ts';
import InvalidConfigException from '../core/InvalidConfigEception.ts';
import NotFoundException from '../core/NotFoundException.ts';
import Candy from '../Candy.ts';
import type IController from '../core/IController.ts';

/**
 * Web application
 */
export default class Application extends AbstractApplication {
  public override exceptionHandler: string = 'candy/web/ExceptionHandler';

  public interceptor: IClass | null = null;

  public routesMap: any = null;

  public modules: any = null;

  /**
   * 默认视图类
   */
  public defaultView = 'candy/web/View';

  /**
   * 默认控制器命名空间
   */
  public defaultControllerNamespace = 'app/controllers';

  /**
   * 默认路由
   */
  public defaultRoute = 'index/index';

  /**
   * 默认控制器
   */
  public defaultControllerId = 'index';

  /**
   * @inheritdoc
   */
  public override async requestListener(request: Request): Promise<Response> {
    const route = new URL(request.url).pathname;
    const controller = await this.createController(route);

    if (null === controller) {
      throw new NotFoundException('The route requested is not found');
    }
    return new Response('hello');
  }

  /**
   * @inheritdoc
   */
  public override handlerException(exception: IException, request: Request): Response {
    throw new Error('Method not implemented.');
  }

  /**
   * 创建控制器实例
   *
   * @param {String} route 路由
   */
  private createController(route: string): Promise<IController | null> {
    /**
     * 当前的模块
     */
    let moduleId = '';

    /**
     * controllerId 当前的控制器
     */
    let controllerId = '';

    /**
     * viewPath 子目录
     *
     * eg. viewPath = ''  ->  app/views/xxx.html
     * eg. viewPath = 'subdir'  ->  app/views/subdir/xxx.html
     */
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
      return Promise.resolve(null);
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

    // 搜索顺序 用户配置 -> 模块控制器 -> 普通控制器
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
