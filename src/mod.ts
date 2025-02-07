/**
 * @author afu
 * @license MIT
 */
import type IApplication from './core/IApplication.ts';
import type HttpResponse from './http/HttpResponse.ts';
import type IException from './core/IException.ts';
import HttpRequest, { type ConnectionInfo } from './http/HttpRequest.ts';
import Hook from './core/Hook.ts';

/**
 * Framework Entry
 */
export default class Main {
    public application: IApplication;

    constructor(app: IApplication) {
        this.application = app;
    }

    private async requestListener(req: Request, connectionInfo: ConnectionInfo): Promise<Response> {
        let res: HttpResponse;

        try {
            const httpRequest = new HttpRequest(req, connectionInfo);
            if (Hook.hooks.length > 0) {
                return await new Hook(this.application, httpRequest).run();
            }

            res = await this.application.requestListener(httpRequest);
        } catch (e) {
            res = this.application.handlerException(e as IException);
        }

        return res.toResponse();
    }

    public listen(options: Partial<Deno.ServeTcpOptions & Deno.TlsCertifiedKeyPem>): void {
        Deno.serve(options, (req: Request, info: Deno.ServeHandlerInfo<Deno.NetAddr>) => {
            return this.requestListener(req, {
                encrypted: undefined !== options.cert,
                info,
            });
        });
    }
}
