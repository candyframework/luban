/**
 * @author afu
 * @license MIT
 */
import type HttpRequest from '../http/HttpRequest.ts';
import type HttpResponse from '../http/HttpResponse.ts';
import type AbstractExceptionHandler from './AbstractExceptionHandler.ts';
import type AbstractInterceptor from './AbstractInterceptor.ts';
import type IApplication from './IApplication.ts';
import type IException from './IException.ts';
import type { ApplicationConfiguration } from './ApplicationConfiguration.ts';
import Candy from '../Candy.ts';
import InvalidConfigException from './InvalidConfigEception.ts';

/**
 * Base class for application
 */
export default abstract class AbstractApplication implements IApplication {
    public id: string = '';
    public encoding: string = 'UTF-8';
    public debug: boolean = false;
    public exceptionHandler: typeof AbstractExceptionHandler | null = null;
    public interceptor: typeof AbstractInterceptor | null = null;

    constructor(config: ApplicationConfiguration) {
        Candy.application = this;

        this.init(config);
    }

    protected init(config: ApplicationConfiguration): void {
        if (undefined === config.id) {
            throw new InvalidConfigException('The "id" configuration of the Application is missing.');
        }

        if (undefined !== config.appPath) {
            this.setAppPath(config.appPath);
            delete config.appPath;
        }

        if (undefined !== config.runtimePath) {
            this.setRuntimePath(config.runtimePath);
            delete config.runtimePath;
        } else {
            // set as "app/runtime"
            this.setRuntimePath(this.getAppPath() + '/runtime');
        }
    }

    /**
     * @inheritdoc
     */
    public setAppPath(path: string): void {
        Candy.setPathAlias('@app', path);
    }

    /**
     * @inheritdoc
     */
    public getAppPath(): string {
        return Candy.getPathAlias('@app');
    }

    /**
     * @inheritdoc
     */
    public setRuntimePath(path: string): void {
        Candy.setPathAlias('@runtime', path);
    }

    /**
     * @inheritdoc
     */
    public getRuntimePath(): string {
        return Candy.getPathAlias('@runtime');
    }

    /**
     * @inheritdoc
     */
    public abstract requestListener(request: HttpRequest): Promise<HttpResponse>;

    /**
     * @inheritdoc
     */
    public abstract handlerException(exception: IException): HttpResponse;
}
