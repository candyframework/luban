import type AbstractExceptionHandler from './AbstractExceptionHandler.ts';
import type AbstractInterceptor from './AbstractInterceptor.ts';

/**
 * Base configuration for application
 */
export type ApplicationConfiguration = {
    /**
     * See {@link IApplication.id}
     */
    id: string;

    /**
     * See {@link IApplication.endcoding}
     */
    endcoding?: string;

    /**
     * See {@link IApplication.debug}
     */
    debug?: boolean;

    /**
     * See {@link IApplication.exceptionHandler}
     */
    exceptionHandler?: typeof AbstractExceptionHandler;

    /**
     * See {@link IApplication.interceptor}
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
