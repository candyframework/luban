import type HttpRequest from '../http/HttpRequest.ts';
import type IWebApplication from './IWebApplication.ts';

export type Context = {
    application: IWebApplication;
    moduleId: string;
    controllerId: string;
    viewPath: string;
    request?: HttpRequest;
};
