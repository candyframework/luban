import type IApplication from '../core/IApplication.ts';

/**
 * Web application interface
 */
export default interface IWebApplication extends IApplication {
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
    routesMap: Record<string, string> | null;

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
    modules: Record<string, string> | null;

    /**
     * Default view class
     *
     * ```typescript
     * import MyView from 'somepath/MyView.ts';
     *
     * new Application({
     *      defaultView: new MyView()
     * });
     * ```
     */
    defaultView: any;

    /**
     * Default controller directory
     */
    defaultControllerNamespace: string;

    /**
     * Default route
     */
    defaultRoute: string;

    /**
     * Default controller id
     */
    defaultControllerId: string;
}
