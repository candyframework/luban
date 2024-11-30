/**
 * @author afu
 * @license MIT
 */
import type IException from '../core/IException.ts';
import AbstractApplication from '../core/AbstractApplication.ts';

/**
 * Web application
 */
export default class Application extends AbstractApplication {
  
  /**
   * @inheritdoc
   */
  public override requestListener(request: Request): Response {
    return new Response('hello')
  }

  /**
   * @inheritdoc
   */
  public override handlerException(exception: IException, request: Request): Response {
    throw new Error("Method not implemented.");
  }

}
