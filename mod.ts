/**
 * @author afu
 * @license MIT
 */
import type IApplication from './core/IApplication.ts';
import type IException from './core/IException.ts';
import HttpRequest, { type ConnectionInfo } from './http/HttpRequest.ts';

/**
 * Framework Entry
 */
export default class Main {
    public application: IApplication;

    constructor(app: IApplication) {
        this.application = app;
    }

    private async requestListener(req: Request, info: ConnectionInfo): Promise<Response> {
        let res: Response;

        const httpRequest = new HttpRequest(req, info);

        try {
            res = await this.application.requestListener(httpRequest);
        } catch (e) {
            res = await this.application.handlerException(e as IException);
        }

        return res;
    }

    public listen(options: Partial<Deno.ServeTcpOptions & Deno.TlsCertifiedKeyPem>): void {
        const encrypted = undefined !== options.cert;
        Deno.serve(options, (req: Request, info: ConnectionInfo) => {
            info.encrypted = encrypted;
            return this.requestListener(req, info);
        });
    }
}
