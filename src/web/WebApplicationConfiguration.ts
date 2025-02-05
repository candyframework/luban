import type View from './View.ts';
import type { ApplicationConfiguration } from '../core/ApplicationConfiguration.ts';

/**
 * Web application configuration
 */
export type WebApplicationConfiguration = {
    /**
     * See {@link Application.routesMap}
     */
    routesMap?: Record<string, string>;

    /**
     * See {@link Application.modules}
     */
    modules?: Record<string, string>;

    /**
     * See {@link Application.defaultView}
     */
    defaultView?: typeof View;

    /**
     * See {@link Application.defaultControllerNamespace}
     */
    defaultControllerNamespace?: string;

    /**
     * See {@link Application.defaultRoute}
     */
    defaultRoute?: string;

    /**
     * See {@link Application.defaultControllerId}
     */
    defaultControllerId?: string;
} & ApplicationConfiguration;
