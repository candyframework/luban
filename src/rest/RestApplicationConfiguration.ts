import type { ApplicationConfiguration } from '../core/ApplicationConfiguration.ts';

/**
 * Rest application configuration
 */
export type RestApplicationConfiguration = {
    /**
     * Whether to combine routes
     */
    combineRoutes?: boolean;
} & ApplicationConfiguration;
