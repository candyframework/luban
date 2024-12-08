/**
 * @author afu
 * @license MIT
 */
import type IApplication from './IApplication.ts';
import type IException from './IException.ts';
import type HttpRequest from '../http/HttpRequest.ts';
import type AbstractExceptionHandler from './AbstractExceptionHandler.ts';
import Candy from '../Candy.ts';
import InvalidConfigException from './InvalidConfigEception.ts';

export type ApplicationConfig = {
    /**
     * @link AbstractApplication#id
     */
    id: string;

    /**
     * @link IApplication#encoding
     */
    endcoding?: string;

    /**
     * @link IApplication#debug
     */
    debug?: boolean;

    /**
     * @link IApplication#exceptionHandler
     */
    exceptionHandler?: typeof AbstractExceptionHandler;

    /**
     * The path of the application
     */
    appPath?: string;

    /**
     * The path of runtime cache files
     */
    runtimePath?: string;
};

/**
 * Base class for application
 */
export default abstract class AbstractApplication implements IApplication {
    /**
     * Application id
     */
    public id: string = '';

    public encoding: string = 'UTF-8';
    public debug: boolean = false;
    public exceptionHandler: typeof AbstractExceptionHandler | null = null;

    constructor(config: ApplicationConfig) {
        Candy.application = this;

        this.init(config);
    }

    protected init(config: ApplicationConfig): void {
        if (undefined === config.id) {
            throw new InvalidConfigException(
                'The "id" configuration of the Application is missing.',
            );
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
    public abstract requestListener(request: HttpRequest): Promise<Response>;

    /**
     * @inheritdoc
     */
    public abstract handlerException(exception: IException): Response;
}
