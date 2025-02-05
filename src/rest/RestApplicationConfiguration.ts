import type { ApplicationConfiguration } from '../core/ApplicationConfiguration.ts';

/**
 * Rest application configuration
 */
export type RestApplicationConfiguration = {
    /**
     * @link Application#combineRoutes
     */
    combineRoutes?: boolean;
} & ApplicationConfiguration;
