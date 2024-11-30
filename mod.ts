import type IApplication from './core/IApplication.ts';
import type IException from './core/IException.ts';

/**
 * Framework Entry
 */
export default class CandyJs {
  public application: IApplication;

  constructor(app: IApplication) {
    this.application = app;
  }

  private requestListener(req: Request): Response {
    let res: Response

    try {
       res = this.application.requestListener(req);
    } catch(e) {
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
