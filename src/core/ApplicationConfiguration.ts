import type AbstractExceptionHandler from './AbstractExceptionHandler.ts';
import type AbstractInterceptor from './AbstractInterceptor.ts';

/**
 * Base configuration for application
 */
export type ApplicationConfiguration = {
    /**
     * The application id
     */
    id: string;

    /**
     * The application encoding
     */
    encoding?: string;

    /**
     * Debug state
     */
    debug?: boolean;

    /**
     * The exception handler
     */
    exceptionHandler?: typeof AbstractExceptionHandler;

    /**
     * The interceptor
     */
    interceptor?: typeof AbstractInterceptor;

    /**
     * The path of the application
     */
    appPath?: string;

    /**
     * The path of runtime cache files
     */
    runtimePath?: string;
};
