import type IApplication from './core/IApplication.ts';
import type IException from './core/IException.ts';

/**
 * Framework Entry
 */
export default class Main {
  public application: IApplication;

  constructor(app: IApplication) {
    this.application = app;
  }

  private async requestListener(req: Request): Promise<Response> {
    let res: Response;

    try {
      res = await this.application.requestListener(req);
    } catch (e) {
      res = this.application.handlerException(e as IException, req);
    }

    return res;
  }

  public listen(options: Deno.ServeTcpOptions): void {
    Deno.serve(options, (req: Request) => {
      return this.requestListener(req);
    });
  }
}
