import type View from './View.ts';
import type { ApplicationConfiguration } from '../core/ApplicationConfiguration.ts';

/**
 * Web application configuration
 */
export type WebApplicationConfiguration = {
    /**
     * Custom routes map
     */
    routesMap?: Record<string, string>;

    /**
     * Custom modules map
     */
    modules?: Record<string, string>;

    /**
     * The default template engine
     */
    defaultView?: typeof View;

    /**
     * The default controller path
     */
    defaultControllerNamespace?: string;

    /**
     * The default route
     */
    defaultRoute?: string;

    /**
     * The default controller id
     */
    defaultControllerId?: string;
} & ApplicationConfiguration;
