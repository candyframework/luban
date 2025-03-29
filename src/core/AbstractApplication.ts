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
import LuBan from '../LuBan.ts';

/**
 * Base class for application
 */
export default abstract class AbstractApplication implements IApplication {
    public id: string = '';
    public encoding: string = 'UTF-8';
    public debug: boolean = false;
    public exceptionHandler: AbstractExceptionHandler | null = null;
    public interceptor: AbstractInterceptor | null = null;

    constructor(config: Partial<IApplication>) {
        LuBan.application = this;
        this.init(config);
    }

    protected init(config: Partial<IApplication>): void {
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
        LuBan.setPathAlias('@app', path);
    }

    /**
     * @inheritdoc
     */
    public getAppPath(): string {
        return LuBan.getPathAlias('@app');
    }

    /**
     * @inheritdoc
     */
    public setRuntimePath(path: string): void {
        LuBan.setPathAlias('@runtime', path);
    }

    /**
     * @inheritdoc
     */
    public getRuntimePath(): string {
        return LuBan.getPathAlias('@runtime');
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
