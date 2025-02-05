import type HttpRequest from '../http/HttpRequest.ts';

export type Context = {
    application: any;
    moduleId: string;
    controllerId: string;
    viewPath: string;
    request?: HttpRequest;
};
